import { RESET_PASS_TOKEN_EXPIRATION } from "@/config/constants";
import {
  ChangePassword,
  ResetPassword,
  SendResetPasswordEmail,
} from "@/controllers/user/schema";
import { db } from "@/db/connection";
import CreateResetPasswordEmail from "@/emails/reset-password/email";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { EmailJwtPayload } from "@/services/authentication/schema";
import {checkPasswords, hashPassword} from "@/services/authentication/passwordUtils";
import {Request} from "express";
import {findUserById} from "@/repositories/user";

export const getUserByEmail = async (email: string) => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

export const getUserByUsername = async (username: string) => {
  return db.user.findUnique({
    where: {
      username,
    },
  });
};

export const sendUserResetPasswordEmail = async (
  request: SendResetPasswordEmail,
  language: string
) => {
  try {
    const user = await getUserByEmail(request.email);
    if (!user) {
      return { success: true };
    }

    const resetToken = jwt.sign(
      { email: request.email },
      process.env.ACCESS_JWT_SECRET,
      {
        expiresIn: RESET_PASS_TOKEN_EXPIRATION,
      }
    );

    CreateResetPasswordEmail(language, user.username, resetToken, user.email);
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

export const resetUserPassword = async (request: ResetPassword) => {
  try {
    const decoded: EmailJwtPayload = jwt.verify(
      request.token,
      process.env.ACCESS_JWT_SECRET
    );
    const user = await getUserByEmail(decoded.email as string);

    if (!user) {
      return { success: false, error: { user: "user_not_found" } };
    }

    const [salt, hashedPassword] = await hashPassword(request.password);

    await db.user.update({
      where: {
        email: decoded.email,
      },
      data: {
        salt: salt,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return { success: false, error: { resetToken: "token_expired" } };
    } else if (err instanceof JsonWebTokenError) {
      return { success: false, error: { resetToken: "invalid_token" } };
    }
    return { success: false, error: { server: err } };
  }
};

export const changePasswordService = async (req: Request) => {
  const userId = req.jwtPayload?.id as string;
  const data = req.body as ChangePassword;

  try {
    const user = await findUserById(userId);

    if (!user)
      return { success: false }

    const passwordsMatching = await checkPasswords(
      user.password,
      data.oldPassword,
      user.salt
    );

    if (!passwordsMatching) {
      return { success: false, error: { credentials: "not_matching" } };
    }

    const [salt, hashedPassword] = await hashPassword(data.newPassword);

    await db.user.update({
      where: { id: userId },
      data: { salt, password: hashedPassword }
    })

    return { success: true };
  } catch (err) {
    return { success: false, error: { server: err } };
  }
};
