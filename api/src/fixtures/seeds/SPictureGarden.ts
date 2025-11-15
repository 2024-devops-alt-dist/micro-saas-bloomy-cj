import { PrismaClient } from "../../generated/prisma/client";

export default async function seedPictureGarden(prisma: PrismaClient) {
    const pictures = [
        { name: "balcon-ensoleille.jpg" },
        { name: "jardin-urbain.jpg" },
    ];

    const result = await prisma.pictureGarden.createMany({
        data: pictures,
        skipDuplicates: true,
    });

    console.log("✔ PictureGarden seeded ! Inserted:", result.count);
}
