import { postUserExercise, getOwnedExercisesTable, getAllExercisesTable, updateExercise, deleteExercise, getUserExercises } from "@/controllers/exercise/controller";
import { CreateExerciseSchema, UpdateExerciseSchema } from "@/controllers/exercise/schema";
import { PaginationSchema } from "@/db/schema";
import validate from "@/middleware/validate";
import verifyJWT from "@/middleware/verifyJWT";
import { Router } from "express";

export default (router: Router) => {
  router.get("/exercises", verifyJWT, getUserExercises);
  router.put("/exercises/:id", verifyJWT, validate(UpdateExerciseSchema), updateExercise);
  router.post("/exercises", verifyJWT, validate(CreateExerciseSchema), postUserExercise);
  router.post("/exercises/owned", verifyJWT, validate(PaginationSchema), getOwnedExercisesTable);
  router.post("/exercises/all", verifyJWT, validate(PaginationSchema), getAllExercisesTable);
  router.delete("/exercises/:id", verifyJWT, deleteExercise);
}