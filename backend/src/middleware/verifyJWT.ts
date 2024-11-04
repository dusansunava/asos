import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

type CustomJwtPayload = {
  id?: string;
  email?: string;
} & (JwtPayload | string);

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error();

    const decoded: CustomJwtPayload = jwt.verify(
      token,
      process.env.ACCESS_JWT_SECRET
    );
    req.jwtPayload = {
      id: decoded.id as string,
      email: decoded.email as string,
    };

    next();
  } catch (err) {
    return res.status(401).send({ error: "authentication_failure" });
  }
};

export default verifyJWT;
