import { Request, Response } from "express";
import { ServerError } from "@/schema";
import { getAllExercises, createExercise, getUserExercisesService, getExercisesDataTable, deleteExerciseService, updateExerciseService, getExerciseService } from "@/services/exercise/service";

export const getAll = async (req: Request, res: Response) => {
  const result = await getAllExercises();
  if (result.success) {
    result.data;
    return res.status(200).send({ exercises: result.data });
  }
  return res.status(500).send(result.error);
};

export const getUserExercises = async (req: Request, res: Response) => {
  const result = await getUserExercisesService(req);
  if (result.success) {
    return res.status(200).send(result.data);
  }
  return res.status(500).send(result.error);
};

export const getExercise = async (req: Request, res: Response) => {
  const result = await getExerciseService(req.params?.id);
  if (result.success) {
    return res.status(200).send(result.data);
  } else if (result.error?.portfolio === ServerError.NOT_FOUND) {
    return res.status(404).send(result.error);
  }
  return res.status(500).send(result.error);
};

export const updateExercise = async (req: Request, res: Response) => {
  const result = await updateExerciseService(req);
  if (result.success) {
    return res.status(201).send(result.data);
  } else if (
    !result.success && result.error?.exercise === ServerError.NOT_FOUND) {
    return res.status(404).send(result.error);
  } else if (!result.success && result.error?.name === ServerError.NOT_UNIQUE) {
    return res.status(400).send(result.error);
  }
  return res.status(500).send(result.error);
};

export const getOwnedExercisesTable = async (req: Request, res: Response) => {
  const result = await getExercisesDataTable(req, "owned");
  if (result.success) {
    return res.status(200).send(result.data?.exercises);
  } else if (
    !result.success && result.error?.exercises === ServerError.NOT_FOUND) {
    return res.status(404).send(result.error);
  }
  return res.status(500).send(result.error);
};

export const getAllExercisesTable = async (req: Request, res: Response) => {
  const result = await getExercisesDataTable(req, "all");
  if (result.success) {
    return res.status(200).send(result.data?.exercises);
  } else if (
    !result.success && result.error?.exercises === ServerError.NOT_FOUND) {
    return res.status(404).send(result.error);
  }
  return res.status(500).send(result.error);
};

export const postUserExercise = async (req: Request, res: Response) => {
  const result = await createExercise(req);
  if (result.success) {
    return res.status(201).send(result.data);
  } else if (!result.success && result.error?.name === ServerError.NOT_UNIQUE) {
    return res.status(400).send(result.error);
  } else if (!result.success && result.error?.server) {
    return res.status(500).send(result.error);
  }
  return res.status(400).send(result.error);
};

export const deleteExercise = async (req: Request, res: Response) => {
  const result = await deleteExerciseService(req);
  if (result.success) {
    return res.status(200).send(result.data);
  } else if (
    !result.success && result.error?.exercise === ServerError.NOT_FOUND) {
    return res.status(404).send(result.error);
  }
  return res.status(500).send(result.error);
};
