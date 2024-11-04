import { JwtPayload } from "jsonwebtoken";

export type EmailJwtPayload = {
  email?: string;
} & (JwtPayload | string);
