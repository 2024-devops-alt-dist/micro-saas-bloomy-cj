CREATE TABLE "HarvestDate" (
    "id" SERIAL PRIMARY KEY,
    "start_month" INT NOT NULL CHECK ("start_month" BETWEEN 1 AND 12),
    "end_month" INT NOT NULL CHECK ("end_month" BETWEEN 1 AND 12)
);

CREATE TABLE "PlantDate" (
    "id" SERIAL PRIMARY KEY,
    "start_month" INT NOT NULL CHECK ("start_month" BETWEEN 1 AND 12),
    "end_month" INT NOT NULL CHECK ("end_month" BETWEEN 1 AND 12)
);

CREATE TABLE "SowingDate" (
    "id" SERIAL PRIMARY KEY,
    "start_month" INT NOT NULL CHECK ("start_month" BETWEEN 1 AND 12),
    "end_month" INT NOT NULL CHECK ("end_month" BETWEEN 1 AND 12)
);
