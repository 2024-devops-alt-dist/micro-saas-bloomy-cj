import "dotenv/config";
import { execSync } from "child_process";

process.env.NODE_ENV = "test";

/**
 * SÉCURITÉ ABSOLUE
 */
if (!process.env.DATABASE_URL?.includes("test")) {
    throw new Error("🚨 DATABASE_URL n'est PAS une DB de test !");
}

console.log("🧪 ENV :", process.env.NODE_ENV);
console.log("🧪 DB utilisée :", process.env.DATABASE_URL);

// Reset la DB test (sans argument inconnu)
console.log("🔄 Reset DB de test...");
execSync("npx prisma migrate reset --force", { stdio: "inherit" });

// Seed manuel
console.log("🌱 Seed DB de test...");
execSync("npx prisma db seed", { stdio: "inherit" });