-- CreateTable
CREATE TABLE "PlantHasSowingDate" (
    "plantId" INT NOT NULL,
    "sowingDateId" INT NOT NULL,

    CONSTRAINT "PlantHasSowingDate_pkey" PRIMARY KEY ("plantId","sowingDateId")
);

-- CreateTable
CREATE TABLE "PlantHasHarvestDate" (
    "plantId" INT NOT NULL,
    "harvestDateId" INT NOT NULL,

    CONSTRAINT "PlantHasHarvestDate_pkey" PRIMARY KEY ("plantId","harvestDateId")
);

-- CreateTable
CREATE TABLE "PlantHasPlantDate" (
    "plantId" INT NOT NULL,
    "plantDateId" INT NOT NULL,

    CONSTRAINT "PlantHasPlantDate_pkey" PRIMARY KEY ("plantId","plantDateId")
);

-- AddForeignKey
ALTER TABLE "PlantHasSowingDate" ADD CONSTRAINT "PlantHasSowingDate_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantHasSowingDate" ADD CONSTRAINT "PlantHasSowingDate_sowingDateId_fkey" FOREIGN KEY ("sowingDateId") REFERENCES "SowingDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantHasHarvestDate" ADD CONSTRAINT "PlantHasHarvestDate_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantHasHarvestDate" ADD CONSTRAINT "PlantHasHarvestDate_harvestDateId_fkey" FOREIGN KEY ("harvestDateId") REFERENCES "HarvestDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantHasPlantDate" ADD CONSTRAINT "PlantHasPlantDate_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantHasPlantDate" ADD CONSTRAINT "PlantHasPlantDate_plantDateId_fkey" FOREIGN KEY ("plantDateId") REFERENCES "PlantDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
