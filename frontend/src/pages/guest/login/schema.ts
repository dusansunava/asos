import z from "@/lib/zod";

export const LoginFormSchema = z.object({
  username: z.string().min(1).max(150).default(""),
  password: z.string().min(1).default(""),
});

export const SendResetPasswordEmailSchema = z.object({
  email: z.string().email().min(1).max(150).default(""),
});


export type LoginForm = z.infer<typeof LoginFormSchema>;
export type SendResetPasswordEmail = z.infer<typeof SendResetPasswordEmailSchema>;
export type LoginResponse = {
  token: string;
};
export type LoginError = {
  credentials?: string,
  email?: string
}
