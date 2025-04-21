-- DropForeignKey
ALTER TABLE "ClassApplicationAnswer" DROP CONSTRAINT "ClassApplicationAnswer_answerId_fkey";

-- AlterTable
ALTER TABLE "ClassApplicationAnswer" ALTER COLUMN "answerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ClassApplicationAnswer" ADD CONSTRAINT "ClassApplicationAnswer_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
