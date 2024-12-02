import { z } from "zod";

export const PlanExercises = z.object({
  exerciseId: z.string(), // toto je správne meno pre identifikátor cvičenia
  reps: z.number().min(0),
  sets: z.number().min(0),
  rest: z.number().min(0),
  date: z.date()
});

export const CreateTrainingPlanSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(5).max(500),
  duration: z.number().positive(),
  userId: z.string(),
  exercises: z.array(PlanExercises),
});

export const UpdateTrainingPlanSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(5).max(500).optional(),
  duration: z.number().positive().optional(),
  userId: z.string(),
});

export type TCreateTrainingPlan = z.infer<typeof CreateTrainingPlanSchema>;
export type TUpdateTrainingPlan = z.infer<typeof UpdateTrainingPlanSchema>;
