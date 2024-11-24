import { db } from "@/db/connection";
import { NewFoodLogInfo } from "@/services/food/schema";

const getFoodLogById = async (id: string) => {
    return db.foodLog.findUnique({
        where: {
            id,
        },
    });
};

const getFoodLogCalories = async (foodLogId: string, untilDate: Date) => {
    const totalCalories = await db.foodLog.aggregate({
        where: {
            id: foodLogId,
            date: {
                lte: untilDate,
            },
        },
        _sum: {
            calories: true,
        },
    });

    return totalCalories._sum.calories || 0;
};

const getFoodByUser = async (userId: string) => {
    return db.foodLog.findMany({
        where: {
            user_id: userId,
        },
        orderBy: {
            date: 'desc',
        },
    });
};

const updateFoodLogValue = async (id: string, data: any) => {
    return db.foodLog.update({
        where: {
            id,
        },
        data,
    });
};

const createFoodLog = async (userId: string, food: NewFoodLogInfo) => {
    console.log(food.foodInfo)
    return db.foodLog.create({
        data: {
            user_id: userId,
            foodItem: food.foodInfo.name,
            calories: food.foodInfo.nutrients.calories,
            protein: food.foodInfo.nutrients.protein,
            carbs: food.foodInfo.nutrients.carbohydrates,
            fat: food.foodInfo.nutrients.fat,
            date: new Date(),
        },
    });
};

export default {
    updateFoodLogValue,
    getFoodLogById,
    getFoodByUser,
    getFoodLogCalories,
    createFoodLog,
};