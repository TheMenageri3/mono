/*
  Warnings:

  - Made the column `postedDate` on table `JobPosting` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "JobPosting" DROP CONSTRAINT "JobPosting_companyId_fkey";

-- DropForeignKey
ALTER TABLE "JobPosting" DROP CONSTRAINT "JobPosting_hiringManagerId_fkey";

-- AlterTable
ALTER TABLE "JobPosting" ALTER COLUMN "companyId" DROP NOT NULL,
ALTER COLUMN "postedDate" SET NOT NULL,
ALTER COLUMN "hiringManagerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_hiringManagerId_fkey" FOREIGN KEY ("hiringManagerId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
