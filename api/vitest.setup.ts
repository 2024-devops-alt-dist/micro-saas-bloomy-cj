import { execSync } from "child_process";

export async function setup() {
    process.env.NODE_ENV = "test";

    if (!process.env.DATABASE_URL?.includes("test")) {
        throw new Error("🚨 DATABASE_URL n'est PAS une DB de test !");
    }

    console.log("🧪 ENV :", process.env.NODE_ENV);
    console.log("🧪 DB utilisée :", process.env.DATABASE_URL);

    console.log("🔄 Reset DB de test...");
    execSync("npx prisma migrate reset --force", { stdio: "inherit" });

    console.log("🌱 Seed DB de test...");
    execSync("npx prisma db seed", { stdio: "inherit" });
}