-- CreateTable
CREATE TABLE "Watering" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(280) NOT NULL,
    "icon" VARCHAR(280) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Watering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PicturePlant" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(280) NOT NULL,

    CONSTRAINT "PicturePlant_pkey" PRIMARY KEY ("id")
);
