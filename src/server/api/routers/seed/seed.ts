import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  TEST_USER_EMAIL,
  TEST_USER_DATA,
  TEST_USERS,
  TEST_COMPANIES,
} from "./data";
import { TEST_INTERVIEWS, TEST_JOB_APPLICATIONS, TEST_JOBS } from "./data/jobs";
import {
  JobPostingRemoteOption,
  JobPostingEmploymentType,
  JobPostingStatus,
} from "@/generated/prisma";
import { JobPostingExperienceLevel } from "@/generated/prisma";
import { TEST_INDUSTRIES } from "./data/industry";
import { JobApplicationStatus } from "@/generated/prisma";
import { InterviewLocationType, InterviewStatus } from "@/generated/prisma";

export const seed = protectedProcedure.mutation(async ({ ctx }) => {
  const userId = ctx.session.user.id;
  const db = ctx.db;

  // Check if database has already been seeded by looking for test user
  const existingTestUser = await db.user.findUnique({
    where: { email: TEST_USER_EMAIL },
  });

  if (existingTestUser) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Database has already been seeded",
    });
  }

  // Start a transaction to ensure atomicity
  return await db.$transaction(async (tx) => {
    try {
      // Create test users
      const testUser = await tx.user.create({
        data: TEST_USER_DATA,
      });

      // Create additional test users
      await tx.user.createMany({
        data: TEST_USERS,
      });

      // Create test company
      const testCompany = await tx.company.create({
        data: {
          ...TEST_COMPANIES[0],
          createdBy: { connect: { id: testUser.id } },
          updatedBy: { connect: { id: testUser.id } },
        },
      });

      const testIndustry = await tx.industry.create({
        data: {
          ...TEST_INDUSTRIES[0],
          createdBy: { connect: { id: testUser.id } },
          updatedBy: { connect: { id: testUser.id } },
        },
      });

      const testMedia = await tx.media.create({
        data: {
          storageType: "LOCAL",
          title: "Resume",
          type: "PDF",
          url: "https://www.example.com/resume.pdf",
          createdBy: { connect: { id: testUser.id } },
          updatedBy: { connect: { id: testUser.id } }
        },
      });

      // test job posting
      const jobPosting = await tx.jobPosting.create({
        data: {
          ...TEST_JOBS[0],
          remoteOption: TEST_JOBS[0].remoteOption as JobPostingRemoteOption,
          employmentType: TEST_JOBS[0]
            .employmentType as JobPostingEmploymentType,
          experienceLevel: TEST_JOBS[0]
            .experienceLevel as JobPostingExperienceLevel,
          status: TEST_JOBS[0].status as JobPostingStatus,
          createdBy: { connect: { id: testUser.id } },
          updatedBy: { connect: { id: testUser.id } },
          company: { connect: { id: testCompany.id } },
          hiringManager: { connect: { id: testUser.id } },
        },
      });

      await tx.jobPosting.createMany({
        data: TEST_JOBS.slice(1).map((post) => ({
          ...post,
          remoteOption: post.remoteOption as JobPostingRemoteOption,
          createdById: testUser.id,
          updatedById: testUser.id,
          employmentType: post.employmentType as JobPostingEmploymentType,
          experienceLevel: post.experienceLevel as JobPostingExperienceLevel,
          postedDate: new Date(),
          status: post.status as JobPostingStatus,
          hiringManagerId: testUser.id,
          companyId: testCompany.id,
        })),
      });

      await tx.jobPostingIndustry.create({
        data: {
          industryId: testIndustry.id,
          jobPostingId: jobPosting.id,
          createdById: testUser.id,
          updatedById: testUser.id,
        },
      });
      await tx.jobApplication.create({
        data: {
          ...TEST_JOB_APPLICATIONS[0],
          jobPostingId: jobPosting.id,
          createdById: testUser.id,
          updatedById: testUser.id,
          applicantId: testUser.id, // this should be profile ID
          resumeId: testMedia.id,
          status: TEST_JOB_APPLICATIONS[0].status as JobApplicationStatus,
        },
      });

      await tx.interview.create({
        data: {
          ...TEST_INTERVIEWS[0],
          createdById: testUser.id,
          updatedById: testUser.id,
          type: "TECHNICAL",
          interviewLocationType: TEST_INTERVIEWS[0].interviewLocationType as InterviewLocationType,
          status: TEST_INTERVIEWS[0].status as InterviewStatus,
          intervieweeId: testUser.id,
          jobApplicationId: jobPosting.id,
        },
      });

      // TODO: Add your seed data here
      // Example:
      // await tx.company.createMany({
      //   data: TEST_COMPANIES.map(company => ({
      //     ...company,
      //     createdById: testUser.id,
      //     updatedById: testUser.id,
      //   })),
      // });

      return { success: true };
    } catch (error) {
      // If anything fails, the transaction will be rolled back
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to seed database",
        cause: error,
      });
    }
  });
});
