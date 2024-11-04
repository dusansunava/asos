import z from "@/lib/zod";

export const RegistrationFormSchema = z
  .object({
    email: z.string().min(1).max(150).email().default(""),
    username: z.string().min(1).max(150).default(""),
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

export type RegistrationForm = z.infer<typeof RegistrationFormSchema>;
export type ErrorData = {
  email?: string[];
  username?: string[];
  password?: string[];
};
