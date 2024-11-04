import { Request, Response, NextFunction } from "express";
import { SUPPORTED_LANGUAGES } from "@/config/constants";

const language = (req: Request, res: Response, next: NextFunction) => {
  const language = req.header("Accept-Language");
  if (language && SUPPORTED_LANGUAGES.includes(language)) {
    req.language = language;
  } else {
    req.language = "en";
  }
  next();
};

export default language;
