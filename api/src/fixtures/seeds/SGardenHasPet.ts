import { PrismaClient } from "../../generated/prisma/client";

export default async function seedGardenHasPet(prisma: PrismaClient) {
    const gardenHasPetData = [
        { gardenId: 1, petId: 1 },
    ];

    await prisma.gardenHasPet.createMany({
        data: gardenHasPetData,
        skipDuplicates: true,
    });

    console.log("✔ GardenHasPet seeded!");
}
