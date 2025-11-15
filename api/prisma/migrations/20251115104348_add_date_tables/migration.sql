-- CreateTable
CREATE TABLE "HarvestDate" (
    "id" SERIAL NOT NULL,
    "start_month" INT NOT NULL CHECK ("start_month" BETWEEN 1 AND 12),
    "end_month" INT NOT NULL CHECK ("end_month" BETWEEN 1 AND 12),
    
    CONSTRAINT "HarvestDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantDate" (
    "id" SERIAL NOT NULL,
    "start_month" INT NOT NULL CHECK ("start_month" BETWEEN 1 AND 12),
    "end_month" INT NOT NULL CHECK ("end_month" BETWEEN 1 AND 12),

    CONSTRAINT "PlantDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SowingDate" (
    "id" SERIAL NOT NULL,
    "start_month" INT NOT NULL CHECK ("start_month" BETWEEN 1 AND 12),
    "end_month" INT NOT NULL CHECK ("end_month" BETWEEN 1 AND 12),

    CONSTRAINT "SowingDate_pkey" PRIMARY KEY ("id")
);
