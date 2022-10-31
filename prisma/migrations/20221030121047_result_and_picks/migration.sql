-- DropForeignKey
ALTER TABLE "RaceResult" DROP CONSTRAINT "RaceResult_raceId_fkey";

-- DropForeignKey
ALTER TABLE "RaceResult" DROP CONSTRAINT "RaceResult_resultId_fkey";

-- AddForeignKey
ALTER TABLE "RaceResult" ADD CONSTRAINT "RaceResult_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaceResult" ADD CONSTRAINT "RaceResult_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result"("id") ON DELETE CASCADE ON UPDATE CASCADE;
