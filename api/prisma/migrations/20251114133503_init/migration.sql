-- CreateEnum
CREATE TYPE "niveau_toxicite_enum" AS ENUM ('Faible', 'Modéré', 'Élevé');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "password" VARCHAR(280) NOT NULL,
    "picture_profil" VARCHAR(280),
    "registration_date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id"),
    CONSTRAINT lastname_min CHECK (char_length(lastname) >= 2),
    CONSTRAINT firstname_min CHECK (char_length(firstname) >= 2),
    CONSTRAINT email_format CHECK (email LIKE '%@%.%'),
    CONSTRAINT password_min CHECK (char_length(password) >= 8),
    CONSTRAINT role_valid CHECK (role IN ('user', 'admin'))
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
