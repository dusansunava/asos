import z from "@/lib/zod.ts";

export const ChangePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(1).default(""),
    newPassword: z
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
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Common.validations.confirmPassword",
    path: ["confirmPassword"],
  });

export type ChangePasswordForm = z.infer<typeof ChangePasswordFormSchema>;