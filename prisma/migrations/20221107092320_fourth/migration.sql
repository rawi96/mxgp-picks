/*
  Warnings:

  - You are about to drop the column `forthId` on the `Result` table. All the data in the column will be lost.
  - Added the required column `fourthId` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_forthId_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "forthId",
ADD COLUMN     "fourthId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_fourthId_fkey" FOREIGN KEY ("fourthId") REFERENCES "Rider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
