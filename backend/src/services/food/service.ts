import { Request } from "express";
import { db } from "@/db/connection";
import foodLogRepository from "@/repositories/foodLog";
import { CreateFoodLog, UpdateFoodLog } from "@/controllers/foodLog/schema";
import { ServerError } from "@/schema";
import { FoodLogHistoryArray, FoodLogEntry } from "@/services/foodLog/schema";

export const getUserFoodLogsService = async (req: Request) => {
  try {
    const user = req.user;

    const foodLogs = await db.foodLog.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        date: "asc",
      },
    });

    return { success: true, data: foodLogs };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const getUserFoodLogService = async (req: Request, foodLogId: string) => {
  try {
    const user = req.user;

    const foodLog = await foodLogRepository.getFoodLogById(foodLogId);

    if (!foodLog || foodLog.user_id !== user.id) {
      return { success: false, error: { foodLog: ServerError.NOT_FOUND } };
    }

    return { success: true, data: foodLog };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const createFoodLogService = async (req: Request) => {
  try {
    const user = req.user;
    const data = req.body as CreateFoodLog;

    const newFoodLog = await db.foodLog.create({
      data: {
        foodItem: data.foodItem,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
        date: data.date,
        user_id: user.id,
      },
    });

    return { success: true, data: newFoodLog };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const updateFoodLogService = async (req: Request) => {
  try {
    const user = req.user;
    const data = req.body as UpdateFoodLog;
    const foodLogId = req.params?.id;

    const foodLog = await foodLogRepository.getFoodLogById(foodLogId);

    if (!foodLog || foodLog.user_id !== user.id) {
      return { success: false, error: { foodLog: ServerError.NOT_FOUND } };
    }

    const updatedFoodLog = await db.foodLog.update({
      where: {
        id: foodLogId,
      },
      data: {
        foodItem: data.foodItem,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
        date: data.date,
      },
    });

    return { success: true, data: updatedFoodLog };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const deleteFoodLogService = async (req: Request) => {
  try {
    const user = req.user;
    const foodLogId = req.params?.id;

    const foodLog = await foodLogRepository.getFoodLogById(foodLogId);

    if (!foodLog || foodLog.user_id !== user.id) {
      return { success: false, error: { foodLog: ServerError.NOT_FOUND } };
    }

    await db.foodLog.delete({
      where: {
        id: foodLogId,
      },
    });

    return { success: true, data: { id: foodLogId } };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const getFoodLogHistoryService = async (req: Request): Promise<{ success: boolean; data?: FoodLogHistoryArray | null; error?: any }> => {
  try {
    const user = req.user;
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const foodLogs = await db.foodLog.findMany({
      where: {
        user_id: user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return { success: true, data: foodLogs };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};
