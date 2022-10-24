/*
  Warnings:

  - You are about to drop the `Races` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Races";

-- CreateTable
CREATE TABLE "Race" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "factor" INTEGER NOT NULL,
    "wildcardPos" INTEGER NOT NULL,

    CONSTRAINT "Race_pkey" PRIMARY KEY ("id")
);
