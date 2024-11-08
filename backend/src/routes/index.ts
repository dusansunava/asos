import { Router } from "express";
import authentication from "./authentication";
import user from "./user";
import food from "./food";

const router = Router();

export default (): Router => {
  authentication(router);
  user(router);
  food(router)
  return router;
};
