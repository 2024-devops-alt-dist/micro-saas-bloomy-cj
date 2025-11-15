import { PrismaClient, niveau_toxicite_enum } from "../../generated/prisma/client";

export default async function seedPlantHasToxicPet(prisma: PrismaClient) {
    const plantHasToxicPetData = [
        { plantId: 12, petId: 1, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 12, petId: 2, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 17, petId: 1, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 17, petId: 2, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 18, petId: 1, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 18, petId: 2, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 19, petId: 1, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 19, petId: 2, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 21, petId: 1, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 21, petId: 2, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 24, petId: 1, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 24, petId: 2, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 25, petId: 1, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 25, petId: 2, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 28, petId: 1, niveauToxicite: niveau_toxicite_enum.Modéré },
        { plantId: 28, petId: 2, niveauToxicite: niveau_toxicite_enum.Modéré },
    ];

    await prisma.plantHasToxicPet.createMany({
        data: plantHasToxicPetData,
        skipDuplicates: true,
    });

    console.log("✔ PlantHasToxicPet seeded!");
}
