import { Pool } from "pg";
import logger from "../middlewares/logger.js";
import { prisma } from "../lib/prisma"; 

export const connectDB = async () => {
  try {
    // Vérifie que la connexion est possible
    await prisma.$connect();
    logger.info("✅ Connexion BDD PostgreSQL validé.");
  } catch (err) {
    logger.error("❌ Erreur de connexion à PostgreSQL:", err);
    process.exit(1); // Arrête le processus si la connexion échoue
  }
};

// Gestion de la fermeture gracieuse des connexions
export const closeDB = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info("🛑 PostgreSQL déconnexion.");
  } catch (err) {
    logger.error("❌ Échec de la fermeture de la connexion PostgreSQL:", err);
  }
};
