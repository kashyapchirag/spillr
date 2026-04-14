import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface authRequest extends Request {
  user?: {
    userId: string;
  };
}

export const protect = async (
  req: authRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Not Authorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error while protect");
  }
};
