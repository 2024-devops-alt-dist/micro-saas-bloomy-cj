import { PrismaClient } from "../../generated/prisma/client";

export default async function seedTags(prisma: PrismaClient) {
    const tags = [
        { name: 'fruit' },
        { name: 'légume' },
        { name: 'aromatique' },
        { name: 'plante-facile' },
        { name: 'plante-exigeante' },
        { name: 'intérieur' },
        { name: 'extérieur' },
        { name: 'soleil' },
        { name: 'ombre' },
        { name: 'mi-ombre' },
    ];

    await prisma.tag.createMany({
        data: tags,
        skipDuplicates: true,
    });

    console.log('✔ Tags seeded!');
}
