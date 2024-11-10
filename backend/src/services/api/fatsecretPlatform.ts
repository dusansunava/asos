import Axios from "axios";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

// Load environment variables
if (process.env.NODE_ENV === "development") {
  const env = dotenv.config({ path: "../.env.development" });
  dotenvExpand.expand(env);
} else {
  dotenv.config();
}

// Ensure client ID and client secret are loaded correctly
const clientId = process.env.FATSECRET_CLIENT_ID;
const clientSecret = process.env.FATSECRET_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("FatSecret client credentials are missing from environment variables.");
}

// Define token URL for authentication
const tokenUrl = "https://oauth.fatsecret.com/connect/token";

// Create an Axios instance for the FatSecret API
const fatSecretApi = Axios.create({
  baseURL: "https://platform.fatsecret.com/rest/server.api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

let accessToken: string | null = null;
let tokenExpiry: number | null = null;

// Function to request an access token
async function requestAccessToken(): Promise<void> {
  const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;

  const response = await Axios.post(
    tokenUrl,
    "grant_type=client_credentials&scope=basic", // Body as x-www-form-urlencoded
    {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000; // Set expiry time in milliseconds
}

// Function to get the access token, ensuring it's valid
async function getAccessToken(): Promise<string> {
  if (!accessToken || tokenExpiry === null || Date.now() >= tokenExpiry) {
    await requestAccessToken();
  }
  return accessToken as string;
}

// Function to perform a GET request to the FatSecret API
export const getFoodData = async (searchExpression: string) => {
  console.log("HERE");
  const token = await getAccessToken();
  console.log("Token: ", token);

  const response = await fatSecretApi.post("", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      method: "foods.search",
      search_expression: searchExpression,
      format: "json",
    },
  });
  console.log("Response: ", response.data);

  return response.data;
};

export default {
  getFoodData,
};
