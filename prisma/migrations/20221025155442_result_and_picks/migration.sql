/*
  Warnings:

  - A unique constraint covering the columns `[resultId]` on the table `Pick` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[thirdId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[forthId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fifthId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wildcardId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resultId` to the `Pick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fifthId` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forthId` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thirdId` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wildcardId` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pick" ADD COLUMN     "resultId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "fifthId" TEXT NOT NULL,
ADD COLUMN     "forthId" TEXT NOT NULL,
ADD COLUMN     "thirdId" TEXT NOT NULL,
ADD COLUMN     "wildcardId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pick_resultId_key" ON "Pick"("resultId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_thirdId_key" ON "Result"("thirdId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_forthId_key" ON "Result"("forthId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_fifthId_key" ON "Result"("fifthId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_wildcardId_key" ON "Result"("wildcardId");

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_thirdId_fkey" FOREIGN KEY ("thirdId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_forthId_fkey" FOREIGN KEY ("forthId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_fifthId_fkey" FOREIGN KEY ("fifthId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_wildcardId_fkey" FOREIGN KEY ("wildcardId") REFERENCES "Rider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
