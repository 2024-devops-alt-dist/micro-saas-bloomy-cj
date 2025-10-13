import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
const port = process.env.API_PORT;

// Middleware CORS pour autoriser ton frontend
app.use(
  cors({
    origin: "http://localhost:5173", // ton frontend Vite
    methods: ["GET", "POST"],
  })
);

app.get("/api/health", async (_req, res) => {
  try {
    res.status(200).json({ status: "ok", message: "API connected to database!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Database connection failed" });
  }
});

export default app;
