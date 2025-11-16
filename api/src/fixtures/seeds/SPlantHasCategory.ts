import { PrismaClient } from "../../generated/prisma/client";

export default async function seedPlantHasCategory(prismaClient: PrismaClient) {
    const plantHasCategoryData = [
        { plantId: 1, categoryId: 2 },
        { plantId: 2, categoryId: 2 },
        { plantId: 3, categoryId: 2 },
        { plantId: 4, categoryId: 2 },
        { plantId: 5, categoryId: 3 },
        { plantId: 6, categoryId: 3 },
        { plantId: 7, categoryId: 3 },
        { plantId: 8, categoryId: 3 },
        { plantId: 9, categoryId: 2 },
        { plantId: 10, categoryId: 2 },
        { plantId: 11, categoryId: 2 },
        { plantId: 12, categoryId: 1 },
        { plantId: 13, categoryId: 2 },
        { plantId: 14, categoryId: 1 },
        { plantId: 15, categoryId: 2 },
        { plantId: 16, categoryId: 2 },
        { plantId: 17, categoryId: 1 },
        { plantId: 18, categoryId: 1 },
        { plantId: 19, categoryId: 1 },
        { plantId: 20, categoryId: 2 },
        { plantId: 21, categoryId: 2 },
        { plantId: 22, categoryId: 1 },
        { plantId: 23, categoryId: 1 },
        { plantId: 24, categoryId: 1 },
        { plantId: 25, categoryId: 4 },
        { plantId: 26, categoryId: 1 },
        { plantId: 27, categoryId: 2 },
        { plantId: 28, categoryId: 2 },
    ];

    await prismaClient.plantHasCategory.createMany({
        data: plantHasCategoryData,
        skipDuplicates: true,
    });

    console.log("✔ PlantHasCategory seeded!");
}
