import * as z from "zod";
import { ExerciseIntensity } from "@prisma/client";

export const CreateExerciseSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(5).max(500),
    type: z.string().min(1).max(100),
    bodyPart: z.string().min(1).max(100),
    intensity: z.nativeEnum(ExerciseIntensity),
    logo: z.string()
  })
});

export const UpdateExerciseSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(5).max(500),
    type: z.string().min(1).max(100),
    bodyPart: z.string().min(1).max(100),
    intensity: z.nativeEnum(ExerciseIntensity),
    logo: z.string()
  })
});

export type TCreateExercise = z.infer<typeof CreateExerciseSchema>["body"];
export type TUpdateExercise = z.infer<typeof UpdateExerciseSchema>["body"];


