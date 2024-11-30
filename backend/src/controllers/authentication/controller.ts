import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser, getAuthenticatedUser
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

export const authenticatedUser = async (req: Request, res: Response) => {
  const result = await getAuthenticatedUser(req);

  if (result.success && result.user) {
    return res.status(200).send({
      id: result.user.id,
      username: result.user.username,
      email: result.user.email,
      role: result.user.role,
      createdAt: result.user.createdAt,
      updatedAt: result.user.updatedAt
    })
  } else if (!result.success && result.error) {
    return res.status(500).send(result.error);
  }

  return res.status(401)
}