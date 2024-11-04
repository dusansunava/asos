import * as z from "zod";

// Schema for creating a food log entry
export const CreateFoodLogSchema = z.object({
  body: z.object({
    user_id: z.string().min(1, "User ID is required"), // Assuming user_id is mandatory
    foodItem: z.string().min(1, "Food item is required").max(200),
    calories: z.number().min(0, "Calories must be a non-negative number"),
    protein: z.number().min(0, "Protein must be a non-negative number"),
    carbs: z.number().min(0, "Carbs must be a non-negative number"),
    fat: z.number().min(0, "Fat must be a non-negative number"),
    date: z.date().optional(), // Optional; defaults to current date if not provided
  }),
});

// Schema for updating a food log entry
export const UpdateFoodLogSchema = z.object({
  body: z.object({
    foodItem: z.string().min(1, "Food item is required").max(200).optional(),
    calories: z.number().min(0, "Calories must be a non-negative number").optional(),
    protein: z.number().min(0, "Protein must be a non-negative number").optional(),
    carbs: z.number().min(0, "Carbs must be a non-negative number").optional(),
    fat: z.number().min(0, "Fat must be a non-negative number").optional(),
    date: z.date().optional(), // Optional; can be updated if needed
  }),
});

// Schema for validating food log entry retrieval (e.g., by user ID)
export const FoodLogByUserIdSchema = z.object({
  params: z.object({
    user_id: z.string().min(1, "User ID is required"),
  }),
});

// Type inference for TypeScript
export type CreateFoodLog = z.infer<typeof CreateFoodLogSchema>["body"];
export type UpdateFoodLog = z.infer<typeof UpdateFoodLogSchema>["body"];
export type FoodLogByUserId = z.infer<typeof FoodLogByUserIdSchema>["params"];
