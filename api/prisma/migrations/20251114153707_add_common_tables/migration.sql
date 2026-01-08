CREATE TABLE "Exposition" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(280) NOT NULL,
    "icon" VARCHAR(280) NOT NULL,
    "description" TEXT NOT NULL
);

CREATE TABLE "Localisation" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(280) NOT NULL,
    "icon" VARCHAR(280) NOT NULL
);

CREATE TABLE "Pets" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(280) NOT NULL,
    "icon" VARCHAR(280)
);

CREATE TABLE "Category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(280) NOT NULL,
    "icon" VARCHAR(280)
);
