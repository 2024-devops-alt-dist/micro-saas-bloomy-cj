CREATE TYPE "niveau_toxicite_enum" AS ENUM ('Faible', 'Modéré', 'Élevé');

CREATE TABLE "User" (
    "id" SERIAL PRIMARY KEY,
    "lastname" VARCHAR(100) NOT NULL CHECK (char_length(lastname) >= 2),
    "firstname" VARCHAR(100) NOT NULL CHECK (char_length(firstname) >= 2),
    "email" VARCHAR(250) NOT NULL UNIQUE CHECK (email LIKE '%@%.%'),
    "password" VARCHAR(280) NOT NULL CHECK (char_length(password) >= 8),
    "picture_profil" VARCHAR(280),
    "registration_date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "role" TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'))
);

