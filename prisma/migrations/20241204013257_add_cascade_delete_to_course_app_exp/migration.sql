-- DropForeignKey
ALTER TABLE "CourseApplicationExperience" DROP CONSTRAINT "CourseApplicationExperience_courseApplicationId_fkey";

-- AddForeignKey
ALTER TABLE "CourseApplicationExperience" ADD CONSTRAINT "CourseApplicationExperience_courseApplicationId_fkey" FOREIGN KEY ("courseApplicationId") REFERENCES "CourseApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
