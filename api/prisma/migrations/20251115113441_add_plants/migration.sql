-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(280) NOT NULL,
    "parent_slug" VARCHAR(280),
    "name" VARCHAR(280) NOT NULL,
    "description" TEXT NOT NULL,
    "space_between" VARCHAR(280),
    "temperature" VARCHAR(280),
    "id_difficulty" INTEGER,
    "id_exposition" INTEGER,
    "id_watering" INTEGER,
    "id_picture_plant" INTEGER,
    "id_localisation" INTEGER,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plant_slug_key" ON "Plant"("slug");

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_id_difficulty_fkey" FOREIGN KEY ("id_difficulty") REFERENCES "Difficulty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_id_exposition_fkey" FOREIGN KEY ("id_exposition") REFERENCES "Exposition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_id_localisation_fkey" FOREIGN KEY ("id_localisation") REFERENCES "Localisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_id_picture_plant_fkey" FOREIGN KEY ("id_picture_plant") REFERENCES "PicturePlant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_id_watering_fkey" FOREIGN KEY ("id_watering") REFERENCES "Watering"("id") ON DELETE SET NULL ON UPDATE CASCADE;
