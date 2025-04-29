import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  TEST_USER_EMAIL,
  TEST_USER_DATA,
  TEST_USERS,
  TEST_ANSWERS,
  TEST_CLASSES,
  TEST_CLASS_APPLICATIONS,
  TEST_CLASS_APPLICATION_QUESTIONS,
  TEST_CLASS_APPLICATION_RESPONSES,
  TEST_COMMENTS,
  TEST_COMPANIES,
  TEST_EVENTS,
  TEST_EVENT_ATTENDEES,
  TEST_EVENT_COMPANIES,
  TEST_QUESTIONS,
  TEST_SECTIONS,
} from "./data";
import { TEST_INTERVIEWS, TEST_JOB_APPLICATIONS, TEST_JOBS } from "./data/jobs";
import {
  JobPostingRemoteOption,
  JobPostingEmploymentType,
  JobPostingStatus,
  InterviewType,
} from "@/generated/prisma";
import { JobPostingExperienceLevel } from "@/generated/prisma";
import { TEST_INDUSTRIES } from "./data/industry";
import { JobApplicationStatus } from "@/generated/prisma";
import { InterviewLocationType, InterviewStatus } from "@/generated/prisma";
import { TEST_LOCATIONS } from "./data/location";
import { TEST_PROFILES } from "./data/users/profile/data";

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
      const createdLocations = await Promise.all(
        TEST_LOCATIONS.map((location) =>
          tx.location.create({
            data: {
              ...location,
              createdById: testUser.id,
              updatedById: testUser.id,
            },
          })
        )
      );

      // Create additional test users
      const otherUsers = await Promise.all(
        TEST_USERS.map((user) =>
          tx.user.create({
            data: user,
          })
        )
      );

      const createdProfiles = await Promise.all(
        TEST_PROFILES.map((profile, index) =>
          tx.profile.create({
            data: {
              ...profile,
              createdById: testUser.id,
              updatedById: testUser.id,
              userId: index === 0 ? testUser.id : otherUsers[index - 1].id,
            },
          })
        )
      );

      const TEST_PROFILE = createdProfiles[0];

      // Create test company
      const testCompany = await Promise.all(
        TEST_COMPANIES.map((company) =>
          tx.company.create({
            data: {
              ...company,
              createdById: testUser.id,
              updatedById: testUser.id,
            },
          })
        )
      );

      const testIndustry = await Promise.all(
        TEST_INDUSTRIES.map((industry) =>
          tx.industry.create({
            data: {
              ...industry,
              createdById: testUser.id,
              updatedById: testUser.id,
            },
          })
        )
      );

      const testMedia = await tx.media.create({
        data: {
          storageType: "LOCAL",
          title: "Resume",
          type: "PDF",
          url: "https://www.example.com/resume.pdf",
          createdById: testUser.id,
          updatedById: testUser.id,
        },
      });

      // test job posting
      const jobPostings = await Promise.all(
        TEST_JOBS.map((job) =>
          tx.jobPosting.create({
            data: {
              ...job,
              remoteOption: job.remoteOption as JobPostingRemoteOption,
              employmentType: job.employmentType as JobPostingEmploymentType,
              experienceLevel: job.experienceLevel as JobPostingExperienceLevel,
              status: job.status as JobPostingStatus,
              createdById: testUser.id,
              updatedById: testUser.id,
              companyId: testCompany[0].id,
              hiringManagerId: TEST_PROFILE.id,
            },
          })
        )
      );

      await tx.jobPostingIndustry.create({
        data: {
          industryId: testIndustry[0].id,
          jobPostingId: jobPostings[0].id,
          createdById: testUser.id,
          updatedById: testUser.id,
        },
      });
      const createdJobApplications = await Promise.all(
        TEST_JOB_APPLICATIONS.map((jobApplication) =>
          tx.jobApplication.create({
            data: {
              ...jobApplication,
              jobPostingId: jobPostings[0].id,
              createdById: testUser.id,
              updatedById: testUser.id,
              applicantId: TEST_PROFILE.id,
              resumeId: testMedia.id,
              status: jobApplication.status as JobApplicationStatus,
            },
          })
        )
      );

      await tx.interview.createMany({
        data: TEST_INTERVIEWS.map((interview) => ({
          ...interview,
          createdById: testUser.id,
          updatedById: testUser.id,
          type: interview.type as InterviewType,
          interviewLocationType:
            interview.interviewLocationType as InterviewLocationType,
          status: interview.status as InterviewStatus,
          intervieweeId: TEST_PROFILE.id,
          jobApplicationId: createdJobApplications[0].id,
        })),
      });

      // Create questions and answers in sequence
      const createdQuestions = await Promise.all(
        TEST_QUESTIONS.map((question) =>
          tx.question.create({
            data: {
              ...question,
              createdById: testUser.id,
              updatedById: testUser.id,
            },
          })
        )
      );

      // Create answers linked to the questions
      const createdAnswers = await Promise.all(
        TEST_ANSWERS.map((answer, index) =>
          tx.answer.create({
            data: {
              ...answer,
              createdById: testUser.id,
              updatedById: testUser.id,
              answererId: TEST_PROFILE.id,
              questionId: createdQuestions[index].id,
            },
          })
        )
      );

      const createdClases = await Promise.all(
        TEST_CLASSES.map((cl) =>
          tx.class.create({
            data: {
              ...cl,
              createdById: testUser.id,
              updatedById: testUser.id,
            },
          })
        )
      );

      const createdClassApplications = await Promise.all(
        TEST_CLASS_APPLICATIONS.map((classApplication) =>
          tx.classApplication.create({
            data: {
              ...classApplication,
              createdById: testUser.id,
              updatedById: testUser.id,
              classId: createdClases[0].id,
            },
          })
        )
      );

      const createdClassApplicationQuestions = await Promise.all(
        TEST_CLASS_APPLICATION_QUESTIONS.map((classApplicationQuestion) =>
          tx.classApplicationQuestion.create({
            data: {
              ...classApplicationQuestion,
              createdById: testUser.id,
              updatedById: testUser.id,
              classApplicationId: createdClassApplications[0].id,
              questionId: createdQuestions[0].id,
            },
          })
        )
      );

      const createdClassApplicationResponses = await Promise.all(
        TEST_CLASS_APPLICATION_RESPONSES.map((classApplicationResponse) =>
          tx.classApplicationResponse.create({
            data: {
              ...classApplicationResponse,
              createdById: testUser.id,
              updatedById: testUser.id,
              classApplicationId: createdClassApplications[0].id,
            },
          })
        )
      );

      const comments = await Promise.all(
        TEST_COMMENTS.map((comment) =>
          tx.comment.create({
            data: {
              ...comment,
              createdById: testUser.id,
              updatedById: testUser.id,
              commenterId: TEST_PROFILE.id,
            },
          })
        )
      );

      const createdEvents = await Promise.all(
        TEST_EVENTS.map((event) =>
          tx.event.create({
            data: {
              ...event,
              createdById: testUser.id,
              updatedById: testUser.id,
              organizerId: TEST_PROFILE.id,
              locationId: createdLocations[0].id,
            },
          })
        )
      );

      const createdEventAttendees = await Promise.all(
        TEST_EVENT_ATTENDEES.map((eventAttendee) =>
          tx.eventAttendee.create({
            data: {
              ...eventAttendee,
              createdById: testUser.id,
              updatedById: testUser.id,
              attendeeId: TEST_PROFILE.id,
              eventId: createdEvents[0].id,
            },
          })
        )
      );

      const createdEventCompanies = await Promise.all(
        TEST_EVENT_COMPANIES.map((eventCompany) =>
          tx.eventCompany.create({
            data: {
              ...eventCompany,
              createdById: testUser.id,
              updatedById: testUser.id,
              eventId: createdEvents[0].id,
              companyId: testCompany[0].id,
            },
          })
        )
      );

      const createdSections = await Promise.all(
        TEST_SECTIONS.map((section) =>
          tx.section.create({
            data: {
              ...section,
              createdById: testUser.id,
              updatedById: testUser.id,
            },
          })
        )
      );

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
