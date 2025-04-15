/*
  Warnings:

  - You are about to drop the column `profileId` on the `AssignmentSubmission` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `ClassApplication` table. All the data in the column will be lost.
  - You are about to drop the column `applicationId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `assignmnetId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Enrollment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `EventAttendee` table. All the data in the column will be lost.
  - You are about to drop the column `referralUserId` on the `JobApplication` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WorkHistory` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `placements` table. All the data in the column will be lost.
  - Added the required column `answererId` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submitterId` to the `AssignmentSubmissionAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commenterId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attendeeId` to the `EventAttendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hiringManagerId` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WorkHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `placements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssignmentSubmission" DROP CONSTRAINT "AssignmentSubmission_gradedById_fkey";

-- DropForeignKey
ALTER TABLE "AssignmentSubmission" DROP CONSTRAINT "AssignmentSubmission_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ClassApplication" DROP CONSTRAINT "ClassApplication_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventAttendee" DROP CONSTRAINT "EventAttendee_userId_fkey";

-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "JobApplication" DROP CONSTRAINT "JobApplication_referralUserId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkHistory" DROP CONSTRAINT "WorkHistory_userId_fkey";

-- DropForeignKey
ALTER TABLE "_InterviewInterviewers" DROP CONSTRAINT "_InterviewInterviewers_B_fkey";

-- DropForeignKey
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_intervieweeId_fkey";

-- DropForeignKey
ALTER TABLE "placement_feedback" DROP CONSTRAINT "placement_feedback_respondentId_fkey";

-- DropForeignKey
ALTER TABLE "placements" DROP CONSTRAINT "placements_placementFacilitatorId_fkey";

-- DropForeignKey
ALTER TABLE "placements" DROP CONSTRAINT "placements_userId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- DropIndex
DROP INDEX "placements_userId_idx";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "answererId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AssignmentSubmission" DROP COLUMN "profileId",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "submitterId" TEXT;

-- AlterTable
ALTER TABLE "AssignmentSubmissionAnswer" ADD COLUMN     "submitterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClassApplication" DROP COLUMN "profileId",
ADD COLUMN     "applicantId" TEXT;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "applicationId",
DROP COLUMN "assignmnetId",
DROP COLUMN "userId",
ADD COLUMN     "commenterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "organizerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EventAttendee" DROP COLUMN "userId",
ADD COLUMN     "attendeeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "referralUserId",
ADD COLUMN     "referralProfileId" TEXT;

-- AlterTable
ALTER TABLE "JobApplicationQuestion" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "JobPosting" ADD COLUMN     "hiringManagerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "UserSkill" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkHistory" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "placements" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "placements_profileId_idx" ON "placements"("profileId");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_answererId_fkey" FOREIGN KEY ("answererId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_gradedById_fkey" FOREIGN KEY ("gradedById") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmission" ADD CONSTRAINT "AssignmentSubmission_submitterId_fkey" FOREIGN KEY ("submitterId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignmentSubmissionAnswer" ADD CONSTRAINT "AssignmentSubmissionAnswer_submitterId_fkey" FOREIGN KEY ("submitterId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassApplication" ADD CONSTRAINT "ClassApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commenterId_fkey" FOREIGN KEY ("commenterId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendee" ADD CONSTRAINT "EventAttendee_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_intervieweeId_fkey" FOREIGN KEY ("intervieweeId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_referralProfileId_fkey" FOREIGN KEY ("referralProfileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_hiringManagerId_fkey" FOREIGN KEY ("hiringManagerId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placements" ADD CONSTRAINT "placements_placementFacilitatorId_fkey" FOREIGN KEY ("placementFacilitatorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placement_feedback" ADD CONSTRAINT "placement_feedback_respondentId_fkey" FOREIGN KEY ("respondentId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewInterviewers" ADD CONSTRAINT "_InterviewInterviewers_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
