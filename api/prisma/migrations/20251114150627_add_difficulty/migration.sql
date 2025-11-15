-- CreateTable
CREATE TABLE "Difficulty" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(280) NOT NULL,
    "description" TEXT NOT NULL,
    "score" INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
    "icon" VARCHAR(280),

    CONSTRAINT "Difficulty_pkey" PRIMARY KEY ("id")
);
