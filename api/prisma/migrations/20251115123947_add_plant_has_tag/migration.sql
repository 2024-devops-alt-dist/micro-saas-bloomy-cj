-- CreateTable
CREATE TABLE "PlantHasTag" (
    "plantId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "PlantHasTag_pkey" PRIMARY KEY ("plantId","tagId")
);

-- AddForeignKey
ALTER TABLE "PlantHasTag" ADD CONSTRAINT "PlantHasTag_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantHasTag" ADD CONSTRAINT "PlantHasTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
