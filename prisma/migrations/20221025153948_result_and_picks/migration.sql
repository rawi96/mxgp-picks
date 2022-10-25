/*
  Warnings:

  - You are about to drop the column `fifth` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `first` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `fourth` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `second` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `third` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `wildcard` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `fifth` on the `RaceResult` table. All the data in the column will be lost.
  - You are about to drop the column `fourth` on the `RaceResult` table. All the data in the column will be lost.
  - You are about to drop the column `third` on the `RaceResult` table. All the data in the column will be lost.
  - You are about to drop the column `wildcard` on the `RaceResult` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firstId]` on the table `Pick` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[secondId]` on the table `Pick` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstId` to the `Pick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondId` to the `Pick` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pick" DROP COLUMN "fifth",
DROP COLUMN "first",
DROP COLUMN "fourth",
DROP COLUMN "second",
DROP COLUMN "third",
DROP COLUMN "wildcard",
ADD COLUMN     "firstId" TEXT NOT NULL,
ADD COLUMN     "secondId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RaceResult" DROP COLUMN "fifth",
DROP COLUMN "fourth",
DROP COLUMN "third",
DROP COLUMN "wildcard";

-- CreateIndex
CREATE UNIQUE INDEX "Pick_firstId_key" ON "Pick"("firstId");

-- CreateIndex
CREATE UNIQUE INDEX "Pick_secondId_key" ON "Pick"("secondId");

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_firstId_fkey" FOREIGN KEY ("firstId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_secondId_fkey" FOREIGN KEY ("secondId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
