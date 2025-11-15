-- CreateTable
CREATE TABLE "Exposition" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(280) NOT NULL,
    "icon" VARCHAR(280) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Exposition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Localisation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(280) NOT NULL,
    "icon" VARCHAR(280) NOT NULL,

    CONSTRAINT "Localisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pets" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(280) NOT NULL,
    "icon" VARCHAR(280),

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(280) NOT NULL,
    "icon" VARCHAR(280),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
