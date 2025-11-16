-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL PRIMARY KEY,
    "slug" VARCHAR(280) NOT NULL UNIQUE,
    "parent_slug" VARCHAR(280),
    "name" VARCHAR(280) NOT NULL,
    "description" TEXT NOT NULL,
    "space_between" VARCHAR(280),
    "temperature" VARCHAR(280),
    "id_difficulty" INT,
    "id_exposition" INT,
    "id_watering" INT,
    "id_picture_plant" INT,
    "id_localisation" INT
);

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
