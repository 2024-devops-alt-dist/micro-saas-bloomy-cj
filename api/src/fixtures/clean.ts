import { prisma } from "../lib/prisma";

async function cleanDatabase() {
    console.log("🧹 Nettoyage de la base de données...");
    
    try {
        await prisma.$executeRawUnsafe(`
            TRUNCATE TABLE "UserHasFavory", "GardenHasPlant", "GardenHasPet", "PlantHasToxicPet", "PlantHasCategory", "PlantHasTag", "PlantHasPlantDate", "PlantHasHarvestDate", "PlantHasSowingDate", "User", "Garden", "Plant", "PictureGarden", "PicturePlant", "Watering", "Tag", "Category", "Pets", "SowingDate", "HarvestDate", "PlantDate", "Localisation", "Exposition", "Difficulty" RESTART IDENTITY CASCADE;
        `);
        
        console.log("✔ Base de données nettoyée avec succès !");
    } catch (e) {
        console.error("❌ Erreur lors du nettoyage", e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

cleanDatabase();
