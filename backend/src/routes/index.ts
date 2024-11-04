import { Router } from "express";
import authentication from "./authentication";
import user from "./user";
import portfolio from "./portfolio";

const router = Router();

export default (): Router => {
  authentication(router);
  user(router);
  portfolio(router);
  return router;
};
