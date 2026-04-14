import express from "express";
import { getMe } from "../controllers/profileController.ts";
import { protect } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.get("/me", protect, getMe);

export default router;
