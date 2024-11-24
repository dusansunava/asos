import { FoodLog } from "@prisma/client";

export type FoodLogEntry = {
  foodItem: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: Date;
} & FoodLog;

export type FoodLogHistoryRow = {
  id: string;
  user_id: string; // Assuming you'll want to reference the user associated with the food log
  foodItem: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: Date;
};

export type NewFoodLogInfo = {
  id: number;
  amount: number;
  foodInfo: {
    name: string;
    amount: number;
    nutrients: {
      calories: number;
      protein: number;
      carbohydrates: number;
      fat: number;
    };
  };
};

export type FoodLogHistoryArray = FoodLogHistoryRow[];
