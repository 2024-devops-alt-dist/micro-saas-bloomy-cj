import { PrismaClient } from "../../generated/prisma/client";

export default async function seedCommon(prisma: PrismaClient) {
    await prisma.difficulty.createMany({
        data: [
            {
                name: 'Débutant(e) maladroit(e)',
                description: 'Vous avez déjà tenté… mais vos plantes ne survivent pas longtemps. Vous cherchez des espèces très résistantes.',
                score: 1,
                icon: 'debutant-icon.png',
            },
            {
                name: 'Jardinier(ère) occasionnel(le)',
                description: 'Vous avez quelques réussites à votre actif. Vous connaissez les bases, mais vous restez prudent(e).',
                score: 2,
                icon: 'moyen-icon.png',
            },
            {
                name: 'Jardinier(ère) confirmé(e)',
                description: 'Vous savez entretenir et faire prospérer vos plantes. Vous êtes à l’aise pour tester des associations ou des variétés plus exigeantes.',
                score: 3,
                icon: 'expert-icon.png',
            },
        ],
        skipDuplicates: true,
    });

    await prisma.exposition.createMany({
        data: [
            { name: 'Ombre', icon: 'ombre-icon.png', description: 'exposition inférieure à ? heures' },
            { name: 'Mi-ombre', icon: 'mi-ombre-icon.png', description: 'exposition inférieure à ? heures' },
            { name: 'Plein soleil', icon: 'soleil-icon.png', description: 'exposition supérieure à ? heures' },
        ],
        skipDuplicates: true,
    });

    await prisma.localisation.createMany({
        data: [
            { name: 'Intérieur', icon: 'interieur-icon.png' },
            { name: 'Extérieur', icon: 'exterieur-icon.png' },
            { name: 'Les deux', icon: 'int-ext-icon.png' },
        ],
        skipDuplicates: true,
    });

    await prisma.pets.createMany({
        data: [
            { name: 'Chat', icon: 'chat-icon.png' },
            { name: 'Chien', icon: 'chien-icon.png' },
            { name: 'Rongeur', icon: 'rongeur-icon.png' },
            { name: 'Oiseau', icon: 'oiseau-icon.png' },
            { name: 'Reptile', icon: 'reptile-icon.png' },
            { name: 'Aucun', icon: 'aucun-icon.png' },
        ],
        skipDuplicates: true,
    });

    await prisma.category.createMany({
        data: [
            { name: 'Aromatique', icon: 'aromatique_icon.png' },
            { name: 'Potagère', icon: 'potagere-icon.png' },
            { name: 'Fruitière', icon: 'fruitiere-icon.png' },
            { name: 'Ornementale', icon: 'ornementale-icon.png' },
        ],
        skipDuplicates: true,
    });

    console.log('✔ Common data seeded: Difficulty, Exposition, Localisation, Pets, Category!');
}
