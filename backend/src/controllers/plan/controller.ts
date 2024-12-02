import { Request, Response } from "express";
import { createTrainingPlan, getTrainingPlans, getTrainingPlanById, updateTrainingPlan, deleteTrainingPlan } from "@/services/plan/service";
import { CreateTrainingPlanSchema, UpdateTrainingPlanSchema } from "@/services/plan/schema";
import user from "@/routes/user";

export const createPlan = async (req: Request, res: Response) => {
  try {

    const userId = req.jwtPayload?.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID not found" });
    }

    req.body.userId = userId
    req.body.duration = 1

    const parsedData = CreateTrainingPlanSchema.parse(req.body);

    const result = await createTrainingPlan(parsedData);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error creating plan:", error);
    return res.status(400).json({ error: "Invalid input data" });
  }
};

export const getPlans = async (_req: Request, res: Response) => {
  try {
    const result = await getTrainingPlans();
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching plans:", error);
    return res.status(500).json({ error: "Failed to fetch plans" });
  }
};

export const getPlanById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await getTrainingPlanById(id);
    if (!result) {
      return res.status(404).json({ error: "Plan not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching plan:", error);
    return res.status(500).json({ error: "Failed to fetch plan" });
  }
};

export const updatePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const parsedData = UpdateTrainingPlanSchema.parse(req.body);
    const result = await updateTrainingPlan(id, parsedData);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error updating plan:", error);
    return res.status(400).json({ error: "Invalid input data" });
  }
};

export const deletePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteTrainingPlan(id);
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting plan:", error);
    return res.status(500).json({ error: "Failed to delete plan" });
  }
};
