/*
  Warnings:

  - You are about to drop the column `firstId` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `secondId` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `firstId` on the `RaceResult` table. All the data in the column will be lost.
  - You are about to drop the column `secondId` on the `RaceResult` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resultId]` on the table `RaceResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resultId` to the `RaceResult` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_firstId_fkey";

-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_secondId_fkey";

-- DropForeignKey
ALTER TABLE "RaceResult" DROP CONSTRAINT "RaceResult_firstId_fkey";

-- DropForeignKey
ALTER TABLE "RaceResult" DROP CONSTRAINT "RaceResult_secondId_fkey";

-- DropIndex
DROP INDEX "Pick_firstId_key";

-- DropIndex
DROP INDEX "Pick_secondId_key";

-- DropIndex
DROP INDEX "RaceResult_firstId_key";

-- DropIndex
DROP INDEX "RaceResult_secondId_key";

-- AlterTable
ALTER TABLE "Pick" DROP COLUMN "firstId",
DROP COLUMN "secondId";

-- AlterTable
ALTER TABLE "RaceResult" DROP COLUMN "firstId",
DROP COLUMN "secondId",
ADD COLUMN     "resultId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "firstId" TEXT NOT NULL,
    "secondId" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Result_firstId_key" ON "Result"("firstId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_secondId_key" ON "Result"("secondId");

-- CreateIndex
CREATE UNIQUE INDEX "RaceResult_resultId_key" ON "RaceResult"("resultId");

-- AddForeignKey
ALTER TABLE "RaceResult" ADD CONSTRAINT "RaceResult_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_firstId_fkey" FOREIGN KEY ("firstId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_secondId_fkey" FOREIGN KEY ("secondId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
