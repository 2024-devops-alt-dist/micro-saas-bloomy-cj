-- CreateTable
CREATE TABLE "PlantHasCategory" (
    "plantId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "PlantHasCategory_pkey" PRIMARY KEY ("plantId","categoryId")
);

-- AddForeignKey
ALTER TABLE "PlantHasCategory" ADD CONSTRAINT "PlantHasCategory_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantHasCategory" ADD CONSTRAINT "PlantHasCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
