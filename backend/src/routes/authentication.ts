import {
  login,
  register,
  refreshSession,
  logout,
} from "@/controllers/authentication/controller";
import { Router } from "express";
import validate from "@/middleware/validate";
import {
  LoginUserSchema,
  RegisterUserSchema,
  SendVerificationEmailSchema,
} from "@/controllers/authentication/schema";

export default (router: Router) => {
  router.post("/login", validate(LoginUserSchema), login);
  router.post("/register", validate(RegisterUserSchema), register);
  router.get("/refreshSession", refreshSession);
  router.post("/logout", logout);
};
