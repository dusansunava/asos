import { Request, Response } from "express";
import {
  getUserFoodsService,
} from "@/services/food/service";
import { getFoodData } from "@/services/api/fatsecretPlatform";

export const getUserFoods = async (req: Request, res: Response) => {
  const userId = req.jwtPayload?.id;

  if (!userId){
    return res.status(500).send("user ID undefined")
  }

  const result = await getUserFoodsService(userId);
  if (result.success) {
    return res.status(200).send(result.data);
  }
  return res.status(500).send(result.error?.message);
};

export const getSimilarFoods = async (req: Request, res: Response) => {
  const userId = req.jwtPayload?.id;
  const searchExpression = req.body.searchExpression;

  if (!userId){
    return res.status(500).send("user ID undefined")
  }

  const result = await getFoodData(searchExpression);
  if (result.success) {
    return res.status(200).send(result.data);
  }
  return res.status(500).send(result.error?.message);
};