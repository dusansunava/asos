import { z } from "zod";

// Schéma pre jednotlivé cvičenia
export const PlanExercises = z.object({
  exerciseId: z.string(), // identifikátor cvičenia
  reps: z.number().min(0), // počet opakovaní
  sets: z.number().min(0), // počet sérií
  rest: z.number().min(0), // čas odpočinku
});

// Schéma pre tréningový plán
export const CreateTrainingPlanSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(5).max(500),
  duration: z.number().positive(),
  userId: z.string(),
  date: z.string(),
  exercises: z.array(PlanExercises), // pole objektov, ktoré definujú cvičenia
});

export const UpdateTrainingPlanSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(5).max(500).optional(),
  duration: z.number().positive().optional(),
  userId: z.string(),
});

export type TCreateTrainingPlan = z.infer<typeof CreateTrainingPlanSchema>;
export type TUpdateTrainingPlan = z.infer<typeof UpdateTrainingPlanSchema>;
