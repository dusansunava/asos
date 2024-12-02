import { createPlan, getPlans, getPlanById, updatePlan, deletePlan } from "@/repositories/plan";
import { TCreateTrainingPlan, TUpdateTrainingPlan } from "@/services/plan/schema";

export const createTrainingPlan = async (data: TCreateTrainingPlan) => {
  try {
    const plan = await createPlan(data);
    return plan;
  } catch (error) {
    console.error("Error creating training plan:", error);
    throw new Error("Failed to create training plan");
  }
};

export const getTrainingPlans = async () => {
  try {
    const plans = await getPlans();
    return plans;
  } catch (error) {
    console.error("Error fetching training plans:", error);
    throw new Error("Failed to fetch training plans");
  }
};

export const getTrainingPlanById = async (id: string) => {
  try {
    const plan = await getPlanById(id);
    return plan;
  } catch (error) {
    console.error("Error fetching training plan by ID:", error);
    throw new Error("Failed to fetch training plan");
  }
};

export const updateTrainingPlan = async (id: string, data: TUpdateTrainingPlan) => {
  try {
    const updatedPlan = await updatePlan(id, data);
    return updatedPlan;
  } catch (error) {
    console.error("Error updating training plan:", error);
    throw new Error("Failed to update training plan");
  }
};

export const deleteTrainingPlan = async (id: string) => {
  try {
    await deletePlan(id);
  } catch (error) {
    console.error("Error deleting training plan:", error);
    throw new Error("Failed to delete training plan");
  }
};
