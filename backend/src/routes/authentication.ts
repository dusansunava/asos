import {
  login,
  register,
  refreshSession,
  logout, authenticatedUser,
} from "@/controllers/authentication/controller";
import { Router } from "express";
import validate from "@/middleware/validate";
import {
  LoginUserSchema,
  RegisterUserSchema
} from "@/controllers/authentication/schema";
import verifyJWT from "@/middleware/verifyJWT";

export default (router: Router) => {
  router.post("/login", validate(LoginUserSchema), login);
  router.post("/register", validate(RegisterUserSchema), register);
  router.get("/refreshSession", refreshSession);
  router.post("/logout", logout);
  router.get("/me", verifyJWT, authenticatedUser);
};
