import {
  sendResetPasswordEmail,
  resetPassword, changePassword,
} from "@/controllers/user/controller";
import {
  ChangePasswordSchema,
  ResetPasswordSchema,
  SendResetPasswordEmailSchema,
} from "@/controllers/user/schema";
import validate from "@/middleware/validate";
import { Router } from "express";
import verifyJWT from "@/middleware/verifyJWT";

export default (router: Router) => {
  router.post(
    "/email/sendResetPassword",
    validate(SendResetPasswordEmailSchema),
    sendResetPasswordEmail
  );
  router.post("/passwordReset", validate(ResetPasswordSchema), resetPassword);
  router.post("/passwordChange", verifyJWT, validate(ChangePasswordSchema), changePassword);
};
