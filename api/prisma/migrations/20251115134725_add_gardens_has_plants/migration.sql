-- CreateTable
CREATE TABLE "GardenHasPlant" (
    "gardenId" INTEGER NOT NULL,
    "plantId" INTEGER NOT NULL,

    CONSTRAINT "GardenHasPlant_pkey" PRIMARY KEY ("gardenId","plantId")
);

-- AddForeignKey
ALTER TABLE "GardenHasPlant" ADD CONSTRAINT "GardenHasPlant_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "Garden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardenHasPlant" ADD CONSTRAINT "GardenHasPlant_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
