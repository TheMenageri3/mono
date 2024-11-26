/*
  Warnings:

  - A unique constraint covering the columns `[courseId,applicantId]` on the table `CourseApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseApplication_courseId_applicantId_key" ON "CourseApplication"("courseId", "applicantId");
