import { PrismaClient } from "../../generated/prisma/client";

export default async function seedGardenHasPlant(prisma: PrismaClient) {
    const gardenHasPlantData = [
        { gardenId: 1, plantId: 1 },
        { gardenId: 1, plantId: 3 },
        { gardenId: 1, plantId: 5 },
        { gardenId: 1, plantId: 8 },
        { gardenId: 2, plantId: 12 },
        { gardenId: 2, plantId: 14 },
        { gardenId: 2, plantId: 22 },
        { gardenId: 2, plantId: 26 },
    ];

    await prisma.gardenHasPlant.createMany({
        data: gardenHasPlantData,
        skipDuplicates: true,
    });

    console.log("✔ GardenHasPlants seeded!");
}
