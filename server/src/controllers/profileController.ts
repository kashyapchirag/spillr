import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.ts";

interface authRequest extends Request {
  user?: {
    userId: string;
  };
}

export const getMe = async (req: authRequest, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user?.userId });
    res.status(200).json({ message: "User data is sent", name: user?.name });
  } catch (error) {
    res.status(500).json({ message: "Something is wrong" });
  }
};
