/*
  Warnings:

  - You are about to drop the `ExperienceEntry` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantId` to the `CourseApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExperienceEntry" DROP CONSTRAINT "ExperienceEntry_courseApplicationId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CourseApplication" ADD COLUMN     "applicantId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ExperienceEntry";

-- CreateTable
CREATE TABLE "CourseApplicationExperience" (
    "id" TEXT NOT NULL,
    "courseApplicationId" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "level" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "CourseApplicationExperience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourseApplicationExperience_courseApplicationId_idx" ON "CourseApplicationExperience"("courseApplicationId");

-- AddForeignKey
ALTER TABLE "CourseApplication" ADD CONSTRAINT "CourseApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseApplicationExperience" ADD CONSTRAINT "CourseApplicationExperience_courseApplicationId_fkey" FOREIGN KEY ("courseApplicationId") REFERENCES "CourseApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
