import { EnvVariables } from "./src/schema";
import * as express from "express";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVariables {}
  }

  namespace Express {
    interface Request {
      jwtPayload?: {
        id: string;
        email: string;
      };
      language: string 
    }
  }
}
