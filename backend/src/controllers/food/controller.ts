import { Request, Response } from "express";
import {
  getUserFoodsService,
} from "@/services/food/service";

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