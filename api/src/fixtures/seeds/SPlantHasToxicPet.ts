import { PrismaClient, niveau_toxicite_enum } from "../../generated/prisma/client";

export default async function seedPlantHasToxicPet(prisma: PrismaClient) {
    const plantHasToxicPetData = [
        { plantId: 12, petId: 1, niveauToxicite: niveau_toxicite_enum.Faible },
        { plantId: 17, petId: 1, niveauToxicite: niveau_toxicite_enum.Faible },
        { plantId: 17, petId: 2, niveauToxicite: niveau_toxicite_enum.Faible },
        { plantId: 28, petId: 2, niveauToxicite: niveau_toxicite_enum.Faible },
    ];

    await prisma.plantHasToxicPet.createMany({
        data: plantHasToxicPetData,
        skipDuplicates: true,
    });

    console.log("✔ PlantHasToxicPet seeded!");
}
