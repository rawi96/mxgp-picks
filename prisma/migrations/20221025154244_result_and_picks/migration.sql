/*
  Warnings:

  - You are about to drop the column `first` on the `RaceResult` table. All the data in the column will be lost.
  - You are about to drop the column `second` on the `RaceResult` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firstId]` on the table `RaceResult` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[secondId]` on the table `RaceResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstId` to the `RaceResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondId` to the `RaceResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RaceResult" DROP COLUMN "first",
DROP COLUMN "second",
ADD COLUMN     "firstId" TEXT NOT NULL,
ADD COLUMN     "secondId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RaceResult_firstId_key" ON "RaceResult"("firstId");

-- CreateIndex
CREATE UNIQUE INDEX "RaceResult_secondId_key" ON "RaceResult"("secondId");

-- AddForeignKey
ALTER TABLE "RaceResult" ADD CONSTRAINT "RaceResult_firstId_fkey" FOREIGN KEY ("firstId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceResult" ADD CONSTRAINT "RaceResult_secondId_fkey" FOREIGN KEY ("secondId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
