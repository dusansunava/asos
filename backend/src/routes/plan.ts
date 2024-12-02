import { Router } from "express";
import { createPlan, getPlans, getPlanById } from "@/controllers/plan/controller";
import verifyJWT from "@/middleware/verifyJWT";

export default (router: Router) => {
    router.post("/training-plans", verifyJWT, createPlan);
    router.get("/training-plans", verifyJWT, getPlans);
    router.get("/training-plans/:id", verifyJWT, getPlanById);
  }