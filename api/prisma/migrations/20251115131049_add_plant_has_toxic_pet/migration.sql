-- CreateTable
CREATE TABLE "PlantHasToxicPet" (
    "plantId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,
    "niveauToxicite" "niveau_toxicite_enum" NOT NULL,

    CONSTRAINT "PlantHasToxicPet_pkey" PRIMARY KEY ("plantId","petId")
);

-- AddForeignKey
ALTER TABLE "PlantHasToxicPet" ADD CONSTRAINT "PlantHasToxicPet_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantHasToxicPet" ADD CONSTRAINT "PlantHasToxicPet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
