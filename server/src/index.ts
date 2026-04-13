import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./config/db.ts";
import authRoutes from "./routes/authRoutes.ts";

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

// routes setup
app.use("/api", authRoutes);

export default app;
