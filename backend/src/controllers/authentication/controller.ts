import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
  sendUserVerificationEmail,
  verifyUserEmail,
} from "@/services/authentication/service";

export const register = async (req: Request, res: Response) => {
  const result = await registerUser(req.body, req.language);

  if (result.success) {
    return res.sendStatus(201);
  } else if (!result.success && result.error?.server) {
    return res.status(500).send(result.error);
  }
  return res.status(400).send(result.error);
};

export const login = async (req: Request, res: Response) => {
  const result = await loginUser(req.body);

  if (result.success) {
    res.cookie("jwt", result.data?.refreshToken, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).send({ token: result.data?.accessToken });
  } else if (result.error?.server) {
    return res.status(500).send(result.error);
  } 
  return res.status(401).send(result.error);
};

export const refreshSession = async (req: Request, res: Response) => {
  const result = await refreshUserSession(req);

  if (result.success) {
    return res.status(200).send({ token: result.data?.accessToken });
  } else if (result.error?.server) {
    return res.status(500).send(result.error);
  }
  return res.status(401).send(result.error);
};

export const logout = async (req: Request, res: Response) => {
  const result = await logoutUser(req);

  if (result.success && result.clearCookie) {
    res.clearCookie("jwt", {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    return res.sendStatus(200);
  } else if (result.success && !result.clearCookie) {
    return res.sendStatus(200);
  }
  return res.status(500).send(result.error);
};

export const sendVerificationEmail = async (req: Request, res: Response) => {
  const result = await sendUserVerificationEmail(req.body, req.language);
  if (result?.success === true) {
    return res.sendStatus(200);
  }
  return res.sendStatus(500);
};

export const verifyEmail = async (req: Request, res: Response) => {
  const result = await verifyUserEmail(req.body);

  if (result.success) {
    return res.sendStatus(200);
  } else if (result.error?.server) {
    return res.status(500).send(result.error);
  } else if (result.error?.user === "user_not_found") {
    return res.sendStatus(404);
  } else if (result.error?.verifyToken === "invalid_token") {
    return res.status(401).send({ verifyToken: "invalid_token" });
  }
  return res.status(401).send({ verifyToken: "token_expired" });
};
