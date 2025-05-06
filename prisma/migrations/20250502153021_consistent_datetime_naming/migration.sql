/*
  Warnings:

  - You are about to drop the column `endDate` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `ClassApplication` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `ClassApplication` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Placement` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Placement` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `WorkHistory` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `WorkHistory` table. All the data in the column will be lost.
  - Added the required column `endDatetime` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDatetime` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDatetime` to the `ClassApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDatetime` to the `ClassApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDatetime` to the `Placement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDatetime` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDatetime` to the `WorkHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endDatetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDatetime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ClassApplication" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endDatetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDatetime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Placement" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endDatetime" TIMESTAMP(3),
ADD COLUMN     "startDatetime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endDatetime" TIMESTAMP(3),
ADD COLUMN     "startDatetime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WorkHistory" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endDatetime" TIMESTAMP(3),
ADD COLUMN     "startDatetime" TIMESTAMP(3) NOT NULL;
