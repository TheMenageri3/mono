-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "quarter" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "motivation" TEXT NOT NULL,
    "employed" BOOLEAN NOT NULL,
    "employer" TEXT,
    "support" BOOLEAN NOT NULL,
    "agree" BOOLEAN NOT NULL,
    "courseId" TEXT,

    CONSTRAINT "CourseApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceEntry" (
    "id" TEXT NOT NULL,
    "courseApplicationId" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "level" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ExperienceEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExperienceEntry_courseApplicationId_idx" ON "ExperienceEntry"("courseApplicationId");

-- AddForeignKey
ALTER TABLE "CourseApplication" ADD CONSTRAINT "CourseApplication_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceEntry" ADD CONSTRAINT "ExperienceEntry_courseApplicationId_fkey" FOREIGN KEY ("courseApplicationId") REFERENCES "CourseApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
