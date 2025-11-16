CREATE TABLE "Watering" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(280) NOT NULL,
    "icon" VARCHAR(280) NOT NULL,
    "description" TEXT
);

CREATE TABLE "PicturePlant" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(280) NOT NULL
);
