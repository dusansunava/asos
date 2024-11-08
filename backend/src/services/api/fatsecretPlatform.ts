import Axios from "axios";

// Create an Axios instance for the FatSecret API
const fatSecretApi = Axios.create({
  baseURL: "https://platform.fatsecret.com/rest/server.api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Configuration values for the FatSecret API
const clientId: string = process.env.FATSECRET_CLIENT_ID!;
const clientSecret: string = process.env.FATSECRET_CLIENT_SECRET!;

if (!clientId || !clientSecret) {
  throw new Error("FATSECRET_CLIENT_ID and FATSECRET_CLIENT_SECRET must be defined");
}

const tokenUrl = "https://oauth.fatsecret.com/connect/token";

let accessToken: string | null = null; // Explicitly define type as string or null
let tokenExpiry: number | null = null; // Explicitly define type as number or null

// Function to request an access token
async function requestAccessToken(): Promise<void> {
  const response = await Axios.post(tokenUrl, null, {
    auth: {
      username: clientId,
      password: clientSecret,
    },
    params: {
      grant_type: "client_credentials",
      scope: "basic", // Add your desired scope here
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000; // Store the expiry time
}

// Function to get the access token, ensuring it's valid
async function getAccessToken(): Promise<string> {
  // Check if we already have a valid access token
  if (!accessToken || tokenExpiry === null || Date.now() >= tokenExpiry) {
    await requestAccessToken();
  }
  return accessToken as string; // Assert that accessToken is a string
}

// Function to perform a GET request to the FatSecret API
async function getFoodData(searchExpression: string): Promise<any> {
  const token = await getAccessToken();

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

  return response.data;
}

export default {
  getFoodData,
};
