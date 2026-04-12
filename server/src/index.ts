import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

// env setup
dotenv.config();

// cors stup
app.use(cors());

// global middleware setup
app.use(express.json());

export default app;
