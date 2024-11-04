import * as z from "zod";

export const RegisterUserSchema = z.object({
  body: z.object({
    email: z.string().email().min(3).max(150),
    username: z.string().min(2).max(150),
    password: z
      .string()
      .min(8)
      .max(150)
      .regex(
        /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@-_$%&?^()|{}:<>*"]).*$/,
        "1 special character, 1 number, 1 small letter, 1 big letter"
      ),
  }),
});

export const LoginUserSchema = z.object({
  body: z.object({
    username: z.string().min(2).max(150),
    password: z
      .string()
      .min(8)
      .max(150)
      .regex(
        /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@-_$%&?^()|{}:<>*"]).*$/,
        "1 special character, 1 number, 1 small letter, 1 big letter"
      ),
  }),
});

export const VerifyEmailSchema = z.object({
  body: z.object({
    token: z.string().min(1).max(300),
  }),
});

export const SendVerificationEmailSchema = z.object({
  body: z.object({
    email: z.string().email().min(1).max(150),
  }),
});

export type TRegisterUser = z.infer<typeof RegisterUserSchema>["body"];
export type TLoginUser = z.infer<typeof LoginUserSchema>["body"];
export type TVerifyEmail = z.infer<typeof VerifyEmailSchema>["body"];
export type TSendVerificationEmail = z.infer<
  typeof SendVerificationEmailSchema
>["body"];
