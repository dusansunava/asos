import { ExerciseIntensity, PrismaClient } from "@prisma/client";
import { TCreateTrainingPlan, TUpdateTrainingPlan } from "@/services/plan/schema";
import { date } from "zod";

const prisma = new PrismaClient();

export const createPlan = async (data: TCreateTrainingPlan) => {
  const { exercises, ...planData } = data;

  console.log("Vstupné údaje pre vytvorenie plánu:", planData);
  
  const preparedExercises = await Promise.all(

    exercises.map(async (exercise) =>{
        const existingExercise = await prisma.exercise.findUnique({
            where: {id: exercise.exerciseId}
        });

        if (existingExercise){
          console.log("Cvik:", existingExercise)
          return {id: existingExercise.id}
        }

        return prisma.exercise.create({
            data: {
              id: exercise.exerciseId,
              name: "name",
              bodyPart: "rit",
              logo: "dfgj",
              type: "dskfds", 
              intensity: ExerciseIntensity.HIGH
            }
        });
    })

  );

  console.log("CCC:", preparedExercises)

  const exercisesData = exercises.map(exercise => ({
    exerciseId: exercise.exerciseId,
    reps: exercise.reps,
    sets: exercise.sets,
    rest: exercise.rest
  }));

  const plan = await prisma.plan.create({
    data: {
      name: planData.name,
      description: planData.description,
      duration: planData.duration,
      date: new Date(planData.date),
      user: {
        connect: {id: planData.userId}
      },
      exercises : {
          create: exercisesData
      }
    },
  });
  
  return plan;
  
};


export const getPlans = async () => {
  return prisma.plan.findMany({
    include: { exercises: true }, // Zahrnieme cvičenia pri vyhľadávaní plánov
  });
};

export const getPlanById = async (id: string) => {
  return prisma.plan.findUnique({
    where: { id },
    include: { exercises: true },
  });
};

export const updatePlan = async (id: string, data: TUpdateTrainingPlan) => {
  return prisma.plan.update({
    where: { id },
    data,
  });
};

export const deletePlan = async (id: string) => {
  return prisma.plan.delete({
    where: { id },
  });
};

export default {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
};
