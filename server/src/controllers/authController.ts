import type { Request, Response } from "express";
import User from "../models/User.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user?.email) {
      return res.status(409).json({ message: "Account already exists" });
    }

    // hash the password for security (4 rounds of hashing)
    const hashedPassword = await bcrypt.hash(password, 4);

    await User.create({ name, email, password: hashedPassword });

    res.status(200).json({ message: "Signup was successful" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};

export const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user?.password!);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "email or password is incorrect" });
    }
    const token = jwt.sign({ userId: user?._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
    });

    res.status(201).json({ message: "Signed in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};
