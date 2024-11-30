import { string, object, infer as Infer } from "zod";
import {changePassword} from "@/controllers/user/controller";

export const SendResetPasswordEmailSchema = object({
  body: object({
    email: string().email().min(1).max(150),
  }),
});

export const ResetPasswordSchema = object({
  body: object({
    password: string()
      .min(8)
      .max(150)
      .regex(
        /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@-_$%&?^()|{}:<>*"]).*$/,
        "1 special character, 1 number, 1 small letter, 1 big letter"
      ),
    token: string().min(1).max(300),
  }),
});

export const ChangePasswordSchema = object({
  body: object({
    oldPassword: string()
      .min(1)
      .max(150),
    newPassword: string()
      .min(8)
      .max(150)
      .regex(
        /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@-_$%&?^()|{}:<>*"]).*$/,
        "1 special character, 1 number, 1 small letter, 1 big letter"
      ),
  }),
});

export type ResetPassword = Infer<typeof ResetPasswordSchema>["body"];
export type ChangePassword = Infer<typeof ChangePasswordSchema>["body"];
export type SendResetPasswordEmail = Infer<
  typeof SendResetPasswordEmailSchema
>["body"];
