import { postUserExercise, getExercisesTable, updateExercise, deleteExercise, getUserExercises } from "@/controllers/exercise/controller";
import { CreateExerciseSchema, UpdateExerciseSchema } from "@/controllers/exercise/schema";
import { PaginationSchema } from "@/db/schema";
import validate from "@/middleware/validate";
import verifyJWT from "@/middleware/verifyJWT";
import { Router } from "express";

export default (router: Router) => {
  router.get("/exercises", verifyJWT, getUserExercises);
  router.put("/exercises/:id", verifyJWT, validate(UpdateExerciseSchema), updateExercise);
  router.post("/exercises", verifyJWT, validate(CreateExerciseSchema), postUserExercise);
  router.post("/exercises/table", verifyJWT, validate(PaginationSchema), getExercisesTable);
  router.delete("/exercises/:id", verifyJWT, deleteExercise);
}