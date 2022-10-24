/*
  Warnings:

  - You are about to drop the column `wildCardPos` on the `Races` table. All the data in the column will be lost.
  - Added the required column `wildcardPos` to the `Races` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Races` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Races" DROP COLUMN "wildCardPos",
ADD COLUMN     "wildcardPos" INTEGER NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
