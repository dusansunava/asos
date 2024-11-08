import { Request } from "express";
import foodLogRepository from "@/repositories/foodLog";

export const getUserFoodsService = async (userId: string) => {
  try {
    const foodLogs = await foodLogRepository.getFoodByUser(userId);
    return {
      success: true,
      data: foodLogs,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch food logs";
    return {
      success: false,
      error: {
        message: errorMessage,
      },
    };
  }
};