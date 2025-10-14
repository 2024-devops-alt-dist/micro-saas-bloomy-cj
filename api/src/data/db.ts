import { Pool } from "pg";
import logger from "../middlewares/logger.js";

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT!),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  //connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    // Vérifie que la connexion est possible
    await pool.query("SELECT 1");
    logger.info("✅ Connexion BDD PostgreSQL validé.");
  } catch (err) {
    logger.error("❌ Erreur de connexion à PostgreSQL:", err);
    process.exit(1); // Arrête le processus si la connexion échoue
  }
};

// Gestion de la fermeture gracieuse des connexions
export const closeDB = async (): Promise<void> => {
  try {
    await pool.end();
    logger.info("🛑 PostgreSQL déconnexion.");
  } catch (err) {
    logger.error("❌ Échec de la fermeture de la connexion PostgreSQL:", err);
  }
};
