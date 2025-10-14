// permet de lire les variables définies dans un fichier .env
import "dotenv/config";

import app from "./app.js";
import { connectDB, closeDB } from "./data/db.js";
import logger from "./middlewares/logger.js";

// Fonction principale pour démarrer le serveur
const startServer = async (): Promise<void> => {
  try {
    // Connecte à la base de données
    await connectDB();

    // Démarre le serveur uniquement si la connexion réussit
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`🚀 Le serveur fonctionne : ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Le serveur n'a pas pu démarrer :", err);
    process.exit(1);
  }
};

// Gérer les signaux système pour une fermeture gracieuse
process.on("SIGINT", async () => {
  console.log("🛑 Arrêter le serveur...");
  await closeDB();
  process.exit(0);
});

// Démarre le serveur
startServer();
