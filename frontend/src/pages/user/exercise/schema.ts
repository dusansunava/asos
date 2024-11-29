import { z } from "zod"

export type Exercise = {
  id: string,
  name: string,
  description: string,
  type: string,
  bodyPart: string,
  intensity: ExerciseItensity,
  logo: string,
  createdAt: string,
  updatedAt: string
}

export const ChartSchema = z.object({
  dateFrom: z.date().default(new Date()),
  dateTo: z.date().default(new Date())
}) 

export type ChartSchemaT = z.infer<typeof ChartSchema>


export const CreateExerciseSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(5).max(500),
  type: z.string().min(1).max(100),
  bodyPart: z.string().min(1).max(100),
  intensity: z.string(),
  logo: z.string()
});

export const UpdateExerciseSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(5).max(500),
  type: z.string().min(1).max(100),
  bodyPart: z.string().min(1).max(100),
  intensity: z.string(),
  logo: z.string()
});

export enum ExerciseItensity {
  LOW = "PUBLIC",
  MEDIUM = "PRIVATE",
  HIGH = "HIGH"
}

export type UpdateExercise = z.infer<typeof UpdateExerciseSchema>;
export type CreateExercise = z.infer<typeof CreateExerciseSchema>;

export type Manager = {
  username: string;
}

export type ErrorData = {
  name?: string[];
  value?: number[];
};