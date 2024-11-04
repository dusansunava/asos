import {
  sendResetPasswordEmail,
  resetPassword,
} from "@/controllers/user/controller";
import {
  ResetPasswordSchema,
  SendResetPasswordEmailSchema,
} from "@/controllers/user/schema";
import validate from "@/middleware/validate";
import verifyJWT from "@/middleware/verifyJWT";
import { Router } from "express";

export default (router: Router) => {
  router.post(
    "/email/sendResetPassword",
    validate(SendResetPasswordEmailSchema),
    sendResetPasswordEmail
  );
  router.post("/passwordReset", validate(ResetPasswordSchema), resetPassword);
};
