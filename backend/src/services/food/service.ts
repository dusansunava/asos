import foodLogRepository from "@/repositories/foodLog";
import { NewFoodLogInfo } from "./schema";

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

export const postUserFoodService = async (userId: string, food: NewFoodLogInfo) => {
  if (!userId || !food) {
      throw new Error("User ID and food details are required");
  }

  const newFoodLog = await foodLogRepository.createFoodLog(userId, food);

  return newFoodLog;
};

export const deleteFoodLogService = async (foodLogId: string) => {
  if (!foodLogId) {
      throw new Error("User ID and food log ID are required");
  }

  const newFoodLog = await foodLogRepository.deleteFoodLogDb(foodLogId);

  return newFoodLog;
};