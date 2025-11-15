import { PrismaClient } from "../../generated/prisma/client";

export default async function seedGarden(prisma: PrismaClient) {
    const gardensData = [
        {
            name: "Jardin Balcon Est",
            description: "Chambre étage Gauche",
            createdAt: new Date("2025-11-09T10:00:00Z"),
            id_user: 1,
            id_localisation: 2,
            id_picture_garden: 1,
            id_difficulty: 2,
            id_exposition: 3,
        },
        {
            name: "Jardin Chambre Lulu",
            description: "Petit jardin côté chambre lucie.",
            createdAt: new Date("2025-11-11T09:00:00Z"),
            id_user: 1,
            id_localisation: 2,
            id_picture_garden: 2,
            id_difficulty: 1,
            id_exposition: 2,
        },
    ];

    await prisma.garden.createMany({
        data: gardensData,
        skipDuplicates: true,
    });

    console.log("✔ Garden seeded!");
}
