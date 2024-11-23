import z from "@/lib/zod";

export const CreateFoodSchema = z.object({
  value: z.coerce.number().min(0).max(1000000000),
  name: z.string().min(1).max(200),
  description: z.string().max(500).nullable().optional(),
});

export const UpdateFoodSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(500).nullable(),
});

export const FoodDepositSchema = z.object({
  deposit: z.coerce.number().min(10).max(10000000),
});


export type CreateFood = z.infer<typeof CreateFoodSchema>;
export type ErrorData = {
  name?: string[];
  value?: number[];
};

export type FoodSuggestion = {
  id: number;
  name: string;
}

export type FoodSuggestionResponse = {
  results: FoodSuggestion[];
  offset: number;
  number: number;
  totalResults: number;
};

export type FoodNutrients = {
  name: string;
  amount: number;
  nutrients: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
  };
};