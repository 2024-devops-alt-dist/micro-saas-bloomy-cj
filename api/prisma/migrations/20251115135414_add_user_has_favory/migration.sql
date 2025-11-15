-- CreateTable
CREATE TABLE "UserHasFavory" (
    "userId" INTEGER NOT NULL,
    "plantId" INTEGER NOT NULL,

    CONSTRAINT "UserHasFavory_pkey" PRIMARY KEY ("userId","plantId")
);

-- AddForeignKey
ALTER TABLE "UserHasFavory" ADD CONSTRAINT "UserHasFavory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHasFavory" ADD CONSTRAINT "UserHasFavory_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
