-- CreateTable
CREATE TABLE "GardenHasPet" (
    "gardenId" INTEGER NOT NULL,
    "petId" INTEGER NOT NULL,

    CONSTRAINT "GardenHasPet_pkey" PRIMARY KEY ("gardenId","petId")
);

-- AddForeignKey
ALTER TABLE "GardenHasPet" ADD CONSTRAINT "GardenHasPet_gardenId_fkey" FOREIGN KEY ("gardenId") REFERENCES "Garden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GardenHasPet" ADD CONSTRAINT "GardenHasPet_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
