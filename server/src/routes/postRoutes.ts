import express from "express";
import { createPost, getMyPosts } from "../controllers/postController.ts";
import { protect } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.post("/create-blog", protect, createPost);
router.get("/get-my-posts", protect, getMyPosts);

export default router;
