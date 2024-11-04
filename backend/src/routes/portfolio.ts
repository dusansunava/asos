import { create, getAll } from "@/controllers/portfolio/controller";
import { Router } from "express";
import validate from "@/middleware/validate";
import { CreatePortfolioSchema } from "@/controllers/portfolio/schema";

export default (router: Router) => {
  router.get("/portfolios", getAll);
  router.post("/create", validate(CreatePortfolioSchema), create);
};
