import { Request, Response, NextFunction } from "express";

const credentials = (req: Request, res: Response, next: NextFunction) => {
  let origin = req.headers.origin;

  if (process.env.ALLOWED_ORIGINS && origin) {
    let allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Credentials", "true");
    }
  }
  next();
};

export default credentials;
