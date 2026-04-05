import type { Express } from "express";
import type { HealthStatus } from "../shared/types.js";

export function registerRoutes(app: Express) {
  app.get("/api/health", (_req, res) => {
    const response: HealthStatus = {
      status: "ok",
      message: "Birthday Surprise server is running",
    };
    res.json(response);
  });
}
