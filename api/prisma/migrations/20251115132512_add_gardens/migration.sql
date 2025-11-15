-- CreateTable
CREATE TABLE "Garden" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(280) NOT NULL,
    "description" TEXT,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_DATE,
    "id_user" INTEGER NOT NULL,
    "id_localisation" INTEGER,
    "id_picture_garden" INTEGER,
    "id_difficulty" INTEGER,
    "id_exposition" INTEGER,

    CONSTRAINT "Garden_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Garden" ADD CONSTRAINT "Garden_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garden" ADD CONSTRAINT "Garden_id_localisation_fkey" FOREIGN KEY ("id_localisation") REFERENCES "Localisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garden" ADD CONSTRAINT "Garden_id_picture_garden_fkey" FOREIGN KEY ("id_picture_garden") REFERENCES "PictureGarden"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garden" ADD CONSTRAINT "Garden_id_difficulty_fkey" FOREIGN KEY ("id_difficulty") REFERENCES "Difficulty"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garden" ADD CONSTRAINT "Garden_id_exposition_fkey" FOREIGN KEY ("id_exposition") REFERENCES "Exposition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
