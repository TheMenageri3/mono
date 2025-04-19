/*
  Warnings:

  - You are about to drop the column `applicantId` on the `ClassApplication` table. All the data in the column will be lost.
  - You are about to drop the column `classApplicationId` on the `ClassApplicationAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tagname` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `tagname` on the `UserSkill` table. All the data in the column will be lost.
  - You are about to drop the `contact_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `placement_feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `placements` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[commentId]` on the table `AdminComment` will be added. If there are existing duplicate values, this will fail.
  - Made the column `commentId` on table `AdminComment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `classApplicationQuestionId` to the `ClassApplicationAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `EventAttendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `EventAttendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `EventCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `EventCompany` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagName` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagName` to the `UserSkill` table without a default value. This is not possible if the table is not empty.
  - Made the column `profileId` on table `WorkHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ClassApplicationResponseStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'DEFERRED');

-- DropForeignKey
ALTER TABLE "AdminComment" DROP CONSTRAINT "AdminComment_commentId_fkey";

-- DropForeignKey
ALTER TABLE "ClassApplication" DROP CONSTRAINT "ClassApplication_applicantId_fkey";

-- DropForeignKey
ALTER TABLE "ClassApplicationAnswer" DROP CONSTRAINT "ClassApplicationAnswer_classApplicationId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_locationId_fkey";

-- DropForeignKey
ALTER TABLE "UserSkill" DROP CONSTRAINT "UserSkill_tagname_fkey";

-- DropForeignKey
ALTER TABLE "WorkHistory" DROP CONSTRAINT "WorkHistory_profileId_fkey";

-- DropForeignKey
ALTER TABLE "_AnswerTags" DROP CONSTRAINT "_AnswerTags_B_fkey";

-- DropForeignKey
ALTER TABLE "_AssignmentTags" DROP CONSTRAINT "_AssignmentTags_B_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToTag" DROP CONSTRAINT "_CompanyToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_EventTags" DROP CONSTRAINT "_EventTags_B_fkey";

-- DropForeignKey
ALTER TABLE "_InterviewInterviewers" DROP CONSTRAINT "_InterviewInterviewers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfileTags" DROP CONSTRAINT "_ProfileTags_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectCollaboratorTags" DROP CONSTRAINT "_ProjectCollaboratorTags_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectTags" DROP CONSTRAINT "_ProjectTags_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionTags" DROP CONSTRAINT "_QuestionTags_B_fkey";

-- DropForeignKey
ALTER TABLE "contact_info" DROP CONSTRAINT "contact_info_createdById_fkey";

-- DropForeignKey
ALTER TABLE "contact_info" DROP CONSTRAINT "contact_info_locationId_fkey";

-- DropForeignKey
ALTER TABLE "contact_info" DROP CONSTRAINT "contact_info_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_companyContactId_fkey";

-- DropForeignKey
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_createdById_fkey";

-- DropForeignKey
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_intervieweeId_fkey";

-- DropForeignKey
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_jobApplicationId_fkey";

-- DropForeignKey
ALTER TABLE "interviews" DROP CONSTRAINT "interviews_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_createdById_fkey";

-- DropForeignKey
ALTER TABLE "locations" DROP CONSTRAINT "locations_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "placement_feedback" DROP CONSTRAINT "placement_feedback_createdById_fkey";

-- DropForeignKey
ALTER TABLE "placement_feedback" DROP CONSTRAINT "placement_feedback_placementId_fkey";

-- DropForeignKey
ALTER TABLE "placement_feedback" DROP CONSTRAINT "placement_feedback_respondentId_fkey";

-- DropForeignKey
ALTER TABLE "placement_feedback" DROP CONSTRAINT "placement_feedback_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "placements" DROP CONSTRAINT "placements_companyId_fkey";

-- DropForeignKey
ALTER TABLE "placements" DROP CONSTRAINT "placements_createdById_fkey";

-- DropForeignKey
ALTER TABLE "placements" DROP CONSTRAINT "placements_jobApplicationId_fkey";

-- DropForeignKey
ALTER TABLE "placements" DROP CONSTRAINT "placements_placementFacilitatorId_fkey";

-- DropForeignKey
ALTER TABLE "placements" DROP CONSTRAINT "placements_profileId_fkey";

-- DropForeignKey
ALTER TABLE "placements" DROP CONSTRAINT "placements_updatedById_fkey";

-- AlterTable
ALTER TABLE "AdminComment" ALTER COLUMN "commentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "AssignmentQuestion" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ClassApplication" DROP COLUMN "applicantId",
ADD COLUMN     "publisherId" TEXT;

-- AlterTable
ALTER TABLE "ClassApplicationAnswer" DROP COLUMN "classApplicationId",
ADD COLUMN     "classApplicationQuestionId" TEXT NOT NULL,
ADD COLUMN     "classApplicationResponseId" TEXT;

-- AlterTable
ALTER TABLE "ClassApplicationQuestion" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "commentId",
ADD COLUMN     "adminCommentId" TEXT,
ADD COLUMN     "parentCommentId" TEXT;

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "EventAttendee" ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EventCompany" ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "updatedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "tagname",
ADD COLUMN     "tagName" TEXT NOT NULL,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagName");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashedPassword" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserSkill" DROP COLUMN "tagname",
ADD COLUMN     "tagName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkHistory" ALTER COLUMN "profileId" SET NOT NULL;

-- DropTable
DROP TABLE "contact_info";

-- DropTable
DROP TABLE "interviews";

-- DropTable
DROP TABLE "locations";

-- DropTable
DROP TABLE "placement_feedback";

-- DropTable
DROP TABLE "placements";

-- CreateTable
CREATE TABLE "ClassApplicationResponse" (
    "id" TEXT NOT NULL,
    "status" "ClassApplicationResponseStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,
    "applicantId" TEXT,
    "classApplicationId" TEXT NOT NULL,
    "reviewedById" TEXT,

    CONSTRAINT "ClassApplicationResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "type" "InterviewType" NOT NULL,
    "scheduledDate" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "interviewLocationType" "InterviewLocationType" NOT NULL,
    "preparationNotes" TEXT,
    "status" "InterviewStatus" NOT NULL,
    "feedback" TEXT,
    "candidateFeedback" TEXT,
    "nextSteps" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,
    "intervieweeId" TEXT NOT NULL,
    "jobApplicationId" TEXT NOT NULL,
    "companyContactId" TEXT,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "stateProvince" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "type" "LocationType" NOT NULL,
    "capacity" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Placement" (
    "id" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "employmentType" "EmploymentType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isCurrent" BOOLEAN NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "compensationDetails" TEXT,
    "matchQuality" "MatchQuality" NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verificationDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "placementFacilitatorId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "jobApplicationId" TEXT,

    CONSTRAINT "Placement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacementFeedback" (
    "id" TEXT NOT NULL,
    "feedbackType" "FeedbackType" NOT NULL,
    "satisfactionLevel" "SatisfactionLevel" NOT NULL,
    "preparednessRating" INTEGER NOT NULL,
    "skillsMatchRating" INTEGER NOT NULL,
    "cultureFitRating" INTEGER NOT NULL,
    "feedbackText" TEXT NOT NULL,
    "improvementSuggestions" TEXT,
    "followUpNeeded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,
    "respondentId" TEXT NOT NULL,
    "placementId" TEXT NOT NULL,

    CONSTRAINT "PlacementFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenueContactInfo" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "contactName" TEXT,
    "department" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "VenueContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VenueContactInfo_locationId_key" ON "VenueContactInfo"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminComment_commentId_key" ON "AdminComment"("commentId");

-- AddForeignKey
ALTER TABLE "AdminComment" ADD CONSTRAINT "AdminComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassApplication" ADD CONSTRAINT "ClassApplication_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassApplicationAnswer" ADD CONSTRAINT "ClassApplicationAnswer_classApplicationQuestionId_fkey" FOREIGN KEY ("classApplicationQuestionId") REFERENCES "ClassApplicationQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassApplicationAnswer" ADD CONSTRAINT "ClassApplicationAnswer_classApplicationResponseId_fkey" FOREIGN KEY ("classApplicationResponseId") REFERENCES "ClassApplicationResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassApplicationResponse" ADD CONSTRAINT "ClassApplicationResponse_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassApplicationResponse" ADD CONSTRAINT "ClassApplicationResponse_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassApplicationResponse" ADD CONSTRAINT "ClassApplicationResponse_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassApplicationResponse" ADD CONSTRAINT "ClassApplicationResponse_classApplicationId_fkey" FOREIGN KEY ("classApplicationId") REFERENCES "ClassApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassApplicationResponse" ADD CONSTRAINT "ClassApplicationResponse_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendee" ADD CONSTRAINT "EventAttendee_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendee" ADD CONSTRAINT "EventAttendee_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCompany" ADD CONSTRAINT "EventCompany_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCompany" ADD CONSTRAINT "EventCompany_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_intervieweeId_fkey" FOREIGN KEY ("intervieweeId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_companyContactId_fkey" FOREIGN KEY ("companyContactId") REFERENCES "CompanyContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_placementFacilitatorId_fkey" FOREIGN KEY ("placementFacilitatorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placement" ADD CONSTRAINT "Placement_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacementFeedback" ADD CONSTRAINT "PlacementFeedback_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacementFeedback" ADD CONSTRAINT "PlacementFeedback_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacementFeedback" ADD CONSTRAINT "PlacementFeedback_respondentId_fkey" FOREIGN KEY ("respondentId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacementFeedback" ADD CONSTRAINT "PlacementFeedback_placementId_fkey" FOREIGN KEY ("placementId") REFERENCES "Placement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "UserSkill_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "Tag"("tagName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueContactInfo" ADD CONSTRAINT "VenueContactInfo_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueContactInfo" ADD CONSTRAINT "VenueContactInfo_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueContactInfo" ADD CONSTRAINT "VenueContactInfo_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkHistory" ADD CONSTRAINT "WorkHistory_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerTags" ADD CONSTRAINT "_AnswerTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssignmentTags" ADD CONSTRAINT "_AssignmentTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToTag" ADD CONSTRAINT "_CompanyToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventTags" ADD CONSTRAINT "_EventTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewInterviewers" ADD CONSTRAINT "_InterviewInterviewers_A_fkey" FOREIGN KEY ("A") REFERENCES "Interview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileTags" ADD CONSTRAINT "_ProfileTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectTags" ADD CONSTRAINT "_ProjectTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectCollaboratorTags" ADD CONSTRAINT "_ProjectCollaboratorTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionTags" ADD CONSTRAINT "_QuestionTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("tagName") ON DELETE CASCADE ON UPDATE CASCADE;
