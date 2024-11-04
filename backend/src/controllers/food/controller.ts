import { Request, Response } from "express";
import {
  getUserFoodLogsService,
  createFoodLogService,
  updateFoodLogService,
  deleteFoodLogService,
  getFoodLogByIdService,
} from "@/services/foodlog/service";
import { ServerError } from "@/schema";

// Get all food logs for a specific user
export const getUserFoodLogs = async (req: Request, res: Response) => {
  const userId = req.params.user_id; // Assuming user_id is part of the URL
  const result = await getUserFoodLogsService(userId);
  
  if (result.success) {
    return res.status(200).send(result.data);
  }
  return res.status(500).send(result.error);
};

// Create a new food log entry
export const createFoodLog = async (req: Request, res: Response) => {
  const result = await createFoodLogService(req);
  
  if (result.success) {
    return res.status(201).send(result.data);
  } else if (result.error?.name === ServerError.NOT_UNIQUE) {
    return res.status(400).send(result.error);
  }
  return res.status(500).send(result.error);
};

// Update an existing food log entry
export const updateFoodLog = async (req: Request, res: Response) => {
  const foodLogId = req.params.id; // Assuming the food log ID is part of the URL
  const result = await updateFoodLogService(foodLogId, req);
  
  if (result.success) {
    return res.status(200).send(result.data);
  } else if (result.error?.foodLog === ServerError.NOT_FOUND) {
    return res.status(404).send(result.error);
  }
  return res.status(500).send(result.error);
};

// Delete a food log entry
export const deleteFoodLog = async (req: Request, res: Response) => {
  const foodLogId = req.params.id; // Assuming the food log ID is part of the URL
  const result = await deleteFoodLogService(foodLogId);
  
  if (result.success) {
    return res.status(200).send(result.data);
  } else if (result.error?.foodLog === ServerError.NOT_FOUND) {
    return res.status(404).send(result.error);
  }
  return res.status(500).send(result.error);
};

// Get a specific food log entry by ID
export const getFoodLogById = async (req: Request, res: Response) => {
  const foodLogId = req.params.id; // Assuming the food log ID is part of the URL
  const result = await getFoodLogByIdService(foodLogId);
  
  if (result.success) {
    return res.status(200).send(result.data);
  } else if (result.error?.foodLog === ServerError.NOT_FOUND) {
    return res.status(404).send(result.error);
  }
  return res.status(500).send(result.error);
};
