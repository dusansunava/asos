import Axios from "axios";

const spoonacularApi = Axios.create({
  baseURL: "https://api.spoonacular.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

function getRequest(url: string) {
  return spoonacularApi.get(url, {
    headers: {
      "x-api-key": process.env.SPOONACULAR_API_KEY,
    },
  });
}

export const getSuggestion = async (query: string) => {
  try {
    const response = await getRequest(`/food/ingredients/search?query=${encodeURIComponent(query)}&number=10`);
    console.log("Suggestions:", response.data.results);
    return response; 
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
}

export const getFoodInfo = async (id: number) => {
  try {
    const response = await getRequest(`/food/ingredients/${id}/information?amount=100&unit=grams`);
    console.log("Info:", response.data);
    return response; 
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    throw error;
  }
}

export default {
  getSuggestion,
};
