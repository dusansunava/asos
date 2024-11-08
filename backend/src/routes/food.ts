import { getUserFoods } from "@/controllers/food/controller";
import verifyJWT from "@/middleware/verifyJWT";
import { Router } from "express";

export default (router: Router) => {
  router.get("/food", verifyJWT, getUserFoods);
};