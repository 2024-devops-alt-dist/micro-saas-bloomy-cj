import { PrismaClient } from "../../generated/prisma/client";

export default async function seedUserHasFavory(prisma: PrismaClient) {
    const userHasFavoryData = [
        { userId: 1, plantId: 12 },
        { userId: 1, plantId: 17 },
        { userId: 1, plantId: 19 },
        { userId: 2, plantId: 1 },
        { userId: 2, plantId: 2 },
        { userId: 2, plantId: 3 },
        { userId: 3, plantId: 5 },
        { userId: 3, plantId: 6 },
        { userId: 3, plantId: 7 },
        { userId: 4, plantId: 9 },
        { userId: 4, plantId: 10 },
        { userId: 4, plantId: 13 },
        { userId: 5, plantId: 14 },
        { userId: 5, plantId: 18 },
        { userId: 5, plantId: 20 },
        { userId: 6, plantId: 16 },
        { userId: 6, plantId: 22 },
        { userId: 6, plantId: 27 },
        { userId: 7, plantId: 24 },
        { userId: 7, plantId: 23 },
        { userId: 7, plantId: 21 },
        { userId: 8, plantId: 19 },
        { userId: 8, plantId: 25 },
        { userId: 8, plantId: 12 },
        { userId: 9, plantId: 26 },
        { userId: 9, plantId: 20 },
        { userId: 9, plantId: 18 },
        { userId: 10, plantId: 1 },
        { userId: 10, plantId: 3 },
        { userId: 10, plantId: 17 },
        { userId: 10, plantId: 14 },
    ];

    await prisma.userHasFavory.createMany({
        data: userHasFavoryData,
        skipDuplicates: true,
    });

    console.log("✔ UserHasFavory seeded!");
}
