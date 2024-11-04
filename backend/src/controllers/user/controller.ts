import { Request, Response } from "express";
import {
  resetUserPassword,
  sendUserResetPasswordEmail,
} from "@/services/user/service";

export const sendResetPasswordEmail = async (req: Request, res: Response) => {
  const result = await sendUserResetPasswordEmail(req.body, req.language);

  if (result?.success === true) {
    return res.sendStatus(200);
  }
  return res.sendStatus(500);
};

export const resetPassword = async (req: Request, res: Response) => {
  const result = await resetUserPassword(req.body);

  if (result.success) {
    return res.sendStatus(200);
  } else if (result.error?.server) {
    return res.status(500).send(result.error);
  } else if (result.error?.user === "user_not_found") {
    return res.sendStatus(404);
  } else if (result.error?.resetToken === "invalid_token") {
    return res.status(401).send({ resetToken: "invalid_token" });
  }
  return res.status(401).send({ resetToken: "token_expired" });
};