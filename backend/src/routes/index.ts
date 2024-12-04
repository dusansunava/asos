import { Router } from "express";
import authentication from "./authentication";
import user from "./user";
import food from "./food";
import exercise from "./exercise";
import plan from "./plan";

const router = Router();

export default (): Router => {
  authentication(router);
  user(router);
  food(router);
  exercise(router);
  plan(router)
  return router;
};
