import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { setupSwagger } from "./swagger";
import { router as plantRoutes } from "./routes/plantRoutes";
import { router as usersRoutes } from "./routes/usersRoutes";
import { router as gardenRoutes } from "./routes/gardenRoutes";
import { router as authRoutes } from "./routes/authRoutes";
import { router as commonRoutes } from "./routes/commonRoutes";
import errorHandler from "./middlewares/errorHandler";

const app: Application = express();
const port = process.env.API_PORT;

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONT_URL,
        "http://localhost:5173"
      ];

      // autoriser les tools (Swagger) ou scripts internes
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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

// Middleware pour parser les cookies
app.use(cookieParser());

app.use('/api', plantRoutes);
app.use('/api', usersRoutes);
app.use('/api', gardenRoutes);
app.use('/api', authRoutes);
app.use('/api', commonRoutes);

// Configurer Swagger
setupSwagger(app);

// Middleware d'erreurs centralisé
app.use(errorHandler);

export default app;


// Middleware CORS pour autoriser ton frontend
// app.use(
//   cors({
//     origin: (process.env.FRONT_URL || "http://localhost:5173"), 
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     credentials: true,
//   })
// );

// const allowedOrigin = process.env.FRONT_URL || "http://localhost:5173";

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin) return callback(null, true);
//       if (origin === allowedOrigin) return callback(null, true);
//       callback(new Error("Not allowed by CORS"));
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     credentials: true,
//   })
// );

// app.use(cors({
//   origin: (origin, callback) => {
//     const allowedOrigins = [process.env.FRONT_URL, 'http://localhost:5173'];
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   credentials: true,
// }));


// app.use(cors());