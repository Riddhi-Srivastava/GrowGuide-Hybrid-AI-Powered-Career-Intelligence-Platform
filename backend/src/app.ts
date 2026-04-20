import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import aiToolRoutes from "./routes/aiToolRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

export const app = express();

app.use(
  cors({
    origin: env.clientUrl
  })
);
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/analyze", analysisRoutes);
app.use("/api/ai-tools", aiToolRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
