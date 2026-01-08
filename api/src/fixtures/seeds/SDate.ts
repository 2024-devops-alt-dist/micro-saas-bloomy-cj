import { PrismaClient } from "../../generated/prisma/client";

export default async function seedDates(prisma: PrismaClient) {
    const harvestDates = [
        { start_month: 5, end_month: 6 },
        { start_month: 6, end_month: 8 },
        { start_month: 7, end_month: 9 },
        { start_month: 9, end_month: 10 },
        { start_month: 10, end_month: 11 },
    ];

    const plantDates = [
        { start_month: 1, end_month: 2 },
        { start_month: 4, end_month: 6 },
        { start_month: 11, end_month: 12 },
        { start_month: 3, end_month: 7 },
        { start_month: 7, end_month: 9 },
    ];

    const sowingDates = [
        { start_month: 5, end_month: 6 },
        { start_month: 3, end_month: 5 },
        { start_month: 10, end_month: 12 },
        { start_month: 1, end_month: 3 },
        { start_month: 7, end_month: 9 },
    ];

    await prisma.harvestDate.createMany({ data: harvestDates });
    await prisma.plantDate.createMany({ data: plantDates });
    await prisma.sowingDate.createMany({ data: sowingDates });

    console.log("✔ HarvestDate, PlantDate & SowingDate seeded!");
}
