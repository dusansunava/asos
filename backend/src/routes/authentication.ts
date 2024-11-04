import {
  login,
  register,
  refreshSession,
  logout,
  sendVerificationEmail,
  verifyEmail,
} from "@/controllers/authentication/controller";
import { Router } from "express";
import validate from "@/middleware/validate";
import {
  LoginUserSchema,
  RegisterUserSchema,
  VerifyEmailSchema,
  SendVerificationEmailSchema,
} from "@/controllers/authentication/schema";

export default (router: Router) => {
  router.post("/login", validate(LoginUserSchema), login);
  router.post("/register", validate(RegisterUserSchema), register);
  router.get("/refreshSession", refreshSession);
  router.post("/logout", logout);
  router.post(
    "/email/sendVerification",
    validate(SendVerificationEmailSchema),
    sendVerificationEmail
  );
  router.post("/email/verify", validate(VerifyEmailSchema), verifyEmail);
};
