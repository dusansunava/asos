import z from "zod";

export const EnvVariablesSchema = z.object({
  DB_USER: z.string({
    required_error: "add DB_USER to env.local file like in env.example",
  }),
  DB_PASS: z.string({
    required_error: "add DB_PASS to env.local file like in env.example",
  }),
  DB_NAME: z.string({
    required_error: "add DB_NAME to env.local file like in env.example",
  }),
  DB_PORT: z.string({
    required_error: "add DB_PORT to env.local file like in env.example",
  }),
  SERVER_HOST: z.string({
    required_error: "add SERVER_HOST to env.local file like in env.example",
  }),
  DATABASE_URL: z.string({
    required_error: "add DATABASE_URL to env.local file like in env.example",
  }),
  NODE_ENV: z.enum(["development", "production"]),
  ACCESS_JWT_SECRET: z.string({
    required_error:
      "add ACCESS_JWT_SECRET to env.local file like in env.example",
  }),
  REFRESH_JWT_SECRET: z.string({
    required_error:
      "add REFRESH_JWT_SECRET to env.local file like in env.example",
  }),
  ALLOWED_ORIGINS: z.string().nullable(),
  EMAIL_PASS: z.string({
    required_error: "add EMAIL_PASS to env.local file like in env.example",
  }),
  EMAIL: z.string({
    required_error: "add EMAIL to env.local file like in env.example",
  }),
  BE_PORT: z.string({
    required_error: "add BE_PORT to env.local file like in env.example",
  }),  
  FE_PORT: z.string({
    required_error: "add FE_PORT to env.local file like in env.example",
  }),
});

export type EnvVariables = z.infer<typeof EnvVariablesSchema>;