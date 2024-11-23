import { Request, Response } from "express";
import {
  getUserFoodsService,
} from "@/services/food/service";
import { getFoodData } from "@/services/api/fatsecretPlatform";
import { getSuggestion, getFoodInfo } from "@/services/api/spoonacular";
import food from "@/routes/food";
import { Nutrients } from "./schema";

export const getUserFoods = async (req: Request, res: Response) => {
  const userId = req.jwtPayload?.id;

  if (!userId) {
    return res.status(500).send("user ID undefined")
  }

  const result = await getUserFoodsService(userId);
  if (result.success) {
    return res.status(200).send(result.data);
  }
  return res.status(500).send(result.error?.message);
};

export const postUserFood = async (req: Request, res: Response) => {
  const userId = req.jwtPayload?.id;
  const foodInfo = req.body;

  if (!userId) {
    return res.status(500).send("user ID undefined")
  }

  if (!foodInfo) {
    return res.status(500).send("no food info")
  }

  console.log(foodInfo)

  // const result = await getUserFoodsService(userId);
  // if (result.success) {
  //   return res.status(200).send(result.data);
  // }
  // return res.status(500).send(result.error?.message);
};

export const getSimilarFoods = async (req: Request, res: Response) => {
  const userId = req.jwtPayload?.id;
  const searchExpression = req.body.searchExpression;

  if (!userId) {
    return res.status(500).send("user ID undefined")
  }

  const result = await getFoodData(searchExpression);
  if (result.success) {
    return res.status(200).send(result.data);
  }
  return res.status(500).send(result.error?.message);
};

export const getSuggestionRequest = async (req: Request, res: Response) => {
  const userId = req.jwtPayload?.id;
  const searchExpression = req.body.searchExpression;
  if (!userId) {
    return res.status(500).send("user ID undefined")
  }

  const result = await getSuggestion(searchExpression);
  if (result.status == 200) {
    return res.status(200).send(result.data);
  }
  return res.status(500).send(result.statusText);
}

export const getFoodInfoRequest = async (req: Request, res: Response) => {
  const id = req.body.id;

  if (!id) {
    return res.status(400).send("Food ID is required");
  }

  try {
    const result = await getFoodInfo(id);

    if (result.status === 200) {
      const foodData = result.data;

      const relevantNutrients: Nutrients = {};
      const nutrientKeys = ["Calories", "Protein", "Carbohydrates", "Fat"];

      nutrientKeys.forEach((key) => {
        const nutrient = foodData.nutrition.nutrients.find((n: { name: string; }) => n.name === key);
        relevantNutrients[key.toLowerCase()] = nutrient ? nutrient.amount : null;
      });

      const simplifiedResponse = {
        name: foodData.name,
        amount: foodData.amount,
        nutrients: relevantNutrients,
      };

      return res.status(200).json(simplifiedResponse);
    }

    return res.status(result.status).send(result.statusText);
  } catch (error) {
    console.error("Error fetching food information:", error);
    return res.status(500).send("Failed to fetch food information.");
  }
};