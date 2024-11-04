import z from "@/lib/zod";

export const ResetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1)
      .max(150)
      .min(8)
      .regex(
        /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#@-_$%&?^()|{}:<>*"]).*$/,
        "Common.validations.password"
      )
      .max(150)
      .default(""),
    confirmPassword: z.string().min(1).default(""),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Common.validations.confirmPassword",
    path: ["confirmPassword"],
  });

export type ResetPasswordForm = z.infer<typeof ResetPasswordFormSchema>;