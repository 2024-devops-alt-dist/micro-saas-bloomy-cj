import express, { Application } from "express";
import cors from "cors";
import { setupSwagger } from "./swagger";
import { router as plantRoutes } from "./routes/plantRoutes";
import { router as usersRoutes } from "./routes/usersRoutes";
import { router as gardenRoutes } from "./routes/gardenRoutes";

const app: Application = express();
const port = process.env.API_PORT;

// Middleware CORS pour autoriser ton frontend
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

app.get("/api/health", async (_req, res) => {
  try {
    res.status(200).json({ status: "ok", message: "API connected to database!" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Database connection failed" });
  }
});

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

app.use('/api', plantRoutes);
app.use('/api', usersRoutes);
app.use('/api', gardenRoutes);

// Configurer Swagger
setupSwagger(app);

export default app;
