import type { Request, Response, NextFunction } from "express";
import { Post } from "../models/Post.ts";

interface authRequest extends Request {
  user?: {
    userId: string;
  };
}

export const createPost = async (req: authRequest, res: Response) => {
  try {
    const { title, post } = req.body;
    await Post.create({ title, blog: post, userId: req.user!.userId });

    res.status(201).json({ message: "Post was created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server crashed while creating post", error });
  }
};

export const getMyPosts = async (req: authRequest, res: Response) => {
  try {
    const posts = await Post.find({ userId: req.user!.userId });
    res.status(201).json({ message: "Posts found are attached", posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server crashed while fetching posts", error });
  }
};
