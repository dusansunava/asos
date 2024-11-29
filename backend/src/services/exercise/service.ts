import { Request } from "express";
import { TCreateExercise, TUpdateExercise } from "@/controllers/exercise/schema";
import { db } from "@/db/connection";
import { PaginationRequest } from "@/db/schema";
import exerciseRepository from "@/repositories/exercise";
import { ServerError } from "@/schema";

export const getAllExercises = async () => {
  try {
    const users = await db.exercise.findMany();

    return { success: true, data: users };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const getUserExercisesService = async (req: Request) => {
  try {
    const userId = req.jwtPayload?.id;

    if (!userId) {
      return { success: false, error: { exercise: ServerError.NOT_FOUND } };
    }

    const exercises = await db.exercise.findMany({
      where: {
        owner_id: userId,
      },
      orderBy: {
        id: "asc",
      },
    });
    
    return { success: true, data: exercises };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const updateExerciseService = async (req: Request) => {
  try {
    const userId = req.jwtPayload?.id;
    const data = req.body as TUpdateExercise;
    const exerciseId = req.params?.id;

    if (!exerciseId || !userId || !data.name) {
      return { success: false, error: { exercise: ServerError.NOT_FOUND } };
    }

    const currentExercise = await exerciseRepository.getExerciseById(
      exerciseId
    );

    if (!currentExercise || userId !== currentExercise.owner_id) {
      return { success: false, error: { exercise: ServerError.NOT_FOUND } };
    }

    var existingExerciseWithName = await exerciseRepository.getExerciseByName(data.name);

    if (
      existingExerciseWithName &&
      existingExerciseWithName.id !== currentExercise.id &&
      existingExerciseWithName.name === data.name
    ) {
      return { success: false, error: { name: ServerError.NOT_UNIQUE } };
    }

    const updatedExercise = await db.exercise.update({
      where: {
        id: exerciseId,
      },
      data: {
        name: data.name,
        bodyPart: data.bodyPart,
        intensity: data.intensity,
        type: data.type,
        logo: data.logo,
        description: data.description,
      },
    });

    return {
      success: true,
      data: updatedExercise,
    };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const getExercisesDataTable = async (req: Request) => {
  try {
    var pagRequest: PaginationRequest = req.body
    var userId = req.jwtPayload?.id;

    if (!userId) {
      return { success: false, error: { exercises: ServerError.NOT_FOUND } };
    }

    const exercises = await exerciseRepository.getExercisesByPage(pagRequest, userId);
    
    return {
      success: true,
      data: { exercises },
    };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const createExercise = async (req: Request) => {
  try {
    const userId = req.jwtPayload?.id;
    const data = req.body as TCreateExercise;

    if (!userId || !data.name) {
      return { success: false, error: { exercise: ServerError.NOT_FOUND } };
    }

    var existingExercise = await exerciseRepository.getExerciseByName(data.name);
    if (existingExercise) {
      return { success: false, error: { name: ServerError.NOT_UNIQUE } };
    }
    
    const newExercise = await db.exercise.create({
      data: {
        name: data.name,
        description: data.description,
        bodyPart: data.bodyPart,
        intensity: data.intensity,
        type: data.type,
        owner_id: userId,
        logo: data.logo
      },
    });

    return {
      success: true,
      data: { 
        name: newExercise.name,
        description: newExercise.description,
        bodyPart: newExercise.bodyPart,
        intensity: newExercise.intensity,
        type: newExercise.type,
        logo: newExercise.logo 
      },
    };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const deleteExerciseService = async (req: Request) => {
  try {
    const userId = req.jwtPayload?.id;
    const exerciseId = req.params?.id;

    if (!exerciseId || !userId) {
      return { success: false, error: { exercise: ServerError.NOT_FOUND } };
    }

    const exercise = await exerciseRepository.getExerciseById(exerciseId);

    if (!exercise || exercise.owner_id !== userId) {
      return { success: false, error: { name: ServerError.NOT_FOUND } };
    }

    const deletedExercise = await db.exercise.delete({
      where: {
        id: exerciseId,
      },
    });

    return {
      success: true,
      data: deletedExercise,
    };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};
