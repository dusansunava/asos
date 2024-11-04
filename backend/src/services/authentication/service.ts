import {
  TRegisterUser,
  TLoginUser,
  TSendVerificationEmail,
} from "@/controllers/authentication/schema";
import { db } from "@/db/connection";
import {
  hashPassword,
  checkPasswords,
} from "@/services/authentication/passwordUtils";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Request } from "express";
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  VERIFY_TOKEN_EXPIRATION,
} from "@/config/constants";
import { EmailJwtPayload } from "@/services/authentication/schema";
import CreateVerificationEmail from "@/emails/verification/email";
import { getUserByEmail, getUserByUsername } from "../user/service";

const getUserByRefreshToken = async (refreshToken: string) => {
  return db.user.findFirst({
    where: {
      refreshToken,
    },
  });
};

export const registerUser = async (
  request: TRegisterUser,
  language: string
) => {
  try {
    var existingUser = await getUserByEmail(request.email);
    if (existingUser) {
      return { success: false, error: { email: "not_unique" } };
    }

    existingUser = await getUserByUsername(request.username);
    if (existingUser) {
      return { success: false, error: { username: "not_unique" } };
    }

    const [salt, hashedPassword] = await hashPassword(request.password);

    const newUser = await db.user.create({
      data: {
        email: request.email,
        password: hashedPassword,
        username: request.username,
        salt: salt,
      },
    });

    const verifyToken = jwt.sign(
      { email: request.email },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: VERIFY_TOKEN_EXPIRATION,
      }
    );

    return {
      success: true,
      data: { username: newUser.username, email: newUser.email },
    };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const loginUser = async (request: TLoginUser) => {
  try {
    const existingUser = await getUserByUsername(request.username);
    if (!existingUser) {
      return { success: false, error: { credentials: "not_matching" } };
    }

    const passwordsMatching = await checkPasswords(
      existingUser.password,
      request.password,
      existingUser.salt
    );

    if (!passwordsMatching) {
      return { success: false, error: { credentials: "not_matching" } };
    }

    const accessToken = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      }
    );

    const refreshToken = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.REFRESH_JWT_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      }
    );

    await db.user.update({
      where: {
        username: request.username,
      },
      data: {
        refreshToken,
      },
    });

    return {
      success: true,
      data: { accessToken, refreshToken },
    };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};

export const refreshUserSession = async (request: Request) => {
  if (!request.cookies?.jwt)
    return { success: false, error: { session: "refresh_failed" } };

  const refreshToken = request.cookies.jwt;

  try {
    const user = await getUserByRefreshToken(refreshToken);

    jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
    if (!user) {
      return { success: false, error: { session: "refresh_failed" } };
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      }
    );
    return { success: true, data: { accessToken } };
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return { success: false, error: { session: "refresh_failed" } };
    }
    return { success: false, error: { server: err } };
  }
};

export const logoutUser = async (request: Request) => {
  if (!request.cookies?.jwt) return { success: true, clearCookie: false };

  const refreshToken = request.cookies.jwt;

  try {
    const user = await getUserByRefreshToken(refreshToken);

    if (!user) {
      return { success: true, clearCookie: true };
    }

    await db.user.update({
      where: {
        username: user.username,
      },
      data: {
        refreshToken: null,
      },
    });
    return { success: true, clearCookie: true };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};
