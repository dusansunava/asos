import Axios from "axios";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import crypto from "crypto";
import qs from "querystring";
import { OutgoingMessage } from "http";

interface OAuthParams {
  oauth_consumer_key: string;
  oauth_signature_method: string;
  oauth_timestamp: number;
  oauth_nonce: string;
  oauth_version: string;
  oauth_signature: string; 
}

if (process.env.NODE_ENV === "development") {
  const env = dotenv.config({ path: "../.env.production.development" });
  dotenvExpand.expand(env);
} else {
  dotenv.config();
}

const clientId = process.env.FATSECRET_CLIENT_ID;
const clientSecret = process.env.FATSECRET_CLIENT_SECRET;
const baseUrl = "https://platform.fatsecret.com/rest/server.api";

if (!clientId || !clientSecret) {
  throw new Error("FatSecret client credentials are missing from environment variables.");
}

const generateNonce = () => {
  return crypto.randomBytes(16).toString("hex");
};

const generateTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

const percentEncode = (str: string) => {
  return encodeURIComponent(str).replace(/[!*'()]/g, (c) => "%" + c.charCodeAt(0).toString(16));
};

const createSignature = (method: string, url: string, params: any) => {

  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${percentEncode(key)}=${percentEncode(getObjectValue(params, key as keyof typeof params))}`)
    .join("&");

  console.log("Sorted: ", sortedParams);
  const baseString = `${method.toUpperCase()}&${percentEncode(url)}&${percentEncode(sortedParams)}`;
  console.log("Base string: ", baseString);
  const signingKey = `${percentEncode(clientSecret)}&`;

  return crypto.createHmac("sha1", signingKey).update(baseString).digest("base64");
};

function getObjectValue<T>(obj: T, key: keyof T): string {
  return String(obj[key]);
}

const postToFatSecret = async (method: string, searchExpression: string) => {
  const oauthParams: OAuthParams = {
    oauth_consumer_key: clientId,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: generateTimestamp(),
    oauth_nonce: generateNonce(),
    oauth_version: "1.0",
    oauth_signature: ""
  };

  const apiParams = {
    method,
    search_expression: searchExpression,
    format: "json",
  };

  const params = {
    method: "foods.search" ,
    search_expression: "foo"
  }

  const allParams = { ...oauthParams, ...params };

  allParams.oauth_signature = createSignature("get", baseUrl, allParams)
  console.log("Auth signature: ", allParams.oauth_signature);
  

  const allParamsAsStrings = Object.fromEntries(
    Object.entries(allParams).map(([key, value]) => [key, String(value)])
  );

  console.log("String: ", allParamsAsStrings);
  try {
    const response = await Axios.get(baseUrl, {
      params: allParamsAsStrings
    });




    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in request:", error);
    throw error;
  }
};

export const getFoodData = async (searchExpression: string) => {
  console.log("Requesting food data...");
  return await postToFatSecret("foods.search", searchExpression);
};

export default {
  getFoodData,
};
