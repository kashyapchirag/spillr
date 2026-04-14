import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./config/db.ts";
import authRoutes from "./routes/authRoutes.ts";
import profileRoutes from "./routes/profileRoutes.ts";
import postRoutes from "./routes/postRoutes.ts";
import cookieParser from "cookie-parser";

const app = express();

// env setup
dotenv.config();

// cors setup
app.use(
  cors({
    credentials: true,
  }),
);

// database connection
dbConnection();

// global middleware setup
app.use(express.json());
app.use(cookieParser());

// routes setup
app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", postRoutes);

export default app;
