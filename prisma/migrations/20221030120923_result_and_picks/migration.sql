-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_fifthId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_firstId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_forthId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_secondId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_thirdId_fkey";

-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_wildcardId_fkey";

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_firstId_fkey" FOREIGN KEY ("firstId") REFERENCES "Rider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_secondId_fkey" FOREIGN KEY ("secondId") REFERENCES "Rider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_thirdId_fkey" FOREIGN KEY ("thirdId") REFERENCES "Rider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_forthId_fkey" FOREIGN KEY ("forthId") REFERENCES "Rider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_fifthId_fkey" FOREIGN KEY ("fifthId") REFERENCES "Rider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_wildcardId_fkey" FOREIGN KEY ("wildcardId") REFERENCES "Rider"("id") ON DELETE SET NULL ON UPDATE CASCADE;
