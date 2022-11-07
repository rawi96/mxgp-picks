/*
  Warnings:

  - A unique constraint covering the columns `[raceId]` on the table `Pick` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_raceId_fkey";

-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_resultId_fkey";

-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_userId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Pick_raceId_key" ON "Pick"("raceId");

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;
