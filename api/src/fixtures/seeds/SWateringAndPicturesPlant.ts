import { PrismaClient } from "../../generated/prisma/client";

export default async function seedWateringAndPictures(prisma: PrismaClient) {
    await prisma.watering.createMany({
        data: [
            {
                name: 'Faible',
                icon: 'water1-icon.png',
                description: 'Arrosage occasionnel, sol sec entre deux arrosages (1 fois / semaine voire moins)',
            },
            {
                name: 'Modéré',
                icon: 'water2-icon.png',
                description: 'Sol légèrement humide en permanence, arrosage régulier (2–3 fois / semaine)',
            },
            {
                name: 'Très élevé / exigeant',
                icon: 'water3-icon.png',
                description: 'Arrosage quasi quotidien, souvent en pot petit / exposition plein soleil',
            },
        ],
        skipDuplicates: true,
    });

    const pictures = [
        { name: 'tomate.jpg' },
        { name: 'tomates-coeur-de-boeuf.jpg' },
        { name: 'tomate-cerise.jpg' },
        { name: 'tomate-allongee.jpg' },
        { name: 'fraises.jpg' },
        { name: 'fraise-gariguette.jpg' },
        { name: 'fraise-charlotte.jpg' },
        { name: 'fraise-mara-des-bois.jpg' },
        { name: 'courgette.jpg' },
        { name: 'courgette-jaune.jpg' },
        { name: 'courgette-ronde-de-nice.jpg' },
        { name: 'basilic.jpg' },
        { name: 'concombre.jpg' },
        { name: 'persil.jpg' },
        { name: 'salade.jpg' },
        { name: 'carotte.jpg' },
        { name: 'thym.jpg' },
        { name: 'menthe-verte.jpg' },
        { name: 'romarin.jpg' },
        { name: 'ciboulette.jpg' },
        { name: 'poivron.jpg' },
        { name: 'radis.jpg' },
        { name: 'oseille.jpg' },
        { name: 'sauge.jpg' },
        { name: 'lavande.jpg' },
        { name: 'coriandre.jpg' },
        { name: 'poireau.jpg' },
        { name: 'aubergines.jpg' },
    ];

    for (const picture of pictures) {
        await prisma.picturePlant.create({
            data: picture,
        });
    }

    console.log('✔ Watering and PicturePlant data seeded!');
}
