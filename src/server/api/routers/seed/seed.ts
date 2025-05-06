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
  TEST_COMPANY_CONTACTS,
  TEST_ENROLLMENTS,
  TEST_ADMIN_COMMENTS,
  TEST_VENUE_CONTACT_INFO,
} from "./data";
import {
  TEST_INTERVIEWS,
  TEST_JOB_APPLICATION_QUESTIONS,
  TEST_JOB_APPLICATIONS,
  TEST_JOBS,
} from "./data/jobs";
import {
  JobPostingRemoteOption,
  JobPostingEmploymentType,
  JobPostingStatus,
  InterviewType,
  Profile,
  User,
  Company,
  JobApplication,
  ClassApplication,
  Question,
  Project,
  Location,
  WorkHistory,
  Interview,
  Media,
  AssignmentQuestion,
  Assignment,
  AssignmentSubmission,
  AssignmentSubmissionAnswer,
  Answer,
  JobApplicationQuestion,
  JobApplicationAnswer,
  Placement,
  AdminComment,
  EventAttendee,
  EventCompany,
  VenueContactInfo,
  ProjectCollaborator,
  Section,
  Tag,
  UserSkill,
  Wallet,
  UserRole,
  PlacementFeedback,
  Class,
  ClassApplicationQuestion,
  ClassApplicationResponse,
  Comment,
  Event,
  Enrollment,
  Role,
  CompanyContact,
} from "@/generated/prisma";
import { JobPostingExperienceLevel } from "@/generated/prisma";
import { TEST_INDUSTRIES } from "./data/industry";
import { JobApplicationStatus } from "@/generated/prisma";
import { InterviewLocationType, InterviewStatus } from "@/generated/prisma";
import { TEST_LOCATIONS } from "./data/location";
import { TEST_PROFILES, TEST_WORK_HISTORY } from "./data/users/profile/data";
import { Prisma } from "@/generated/prisma";
import { TEST_PROJECTS } from "./data/projects/projects/data";
import { TEST_PROJECT_COLLABORATIONS } from "./data/projects";
import {
  TEST_PLACEMENTS,
  TEST_PLACEMENTS_FEEDBACK,
} from "./data/jobs/placements/data";
import {
  TEST_ASSIGNMENT_ANSWERS,
  TEST_ASSIGNMENT_QUESTIONS,
  TEST_ASSIGNMENT_SUBMISSIONS,
  TEST_ASSIGNMENTS,
} from "./data/classroom/assignments/data";
import { TEST_USER_SKILLS } from "./data/users/skills/data";
import { TEST_TAGS } from "./data/tags/data";
import { TEST_WALLETS } from "./data/users/wallet/data";
import { TEST_USER_ROLES } from "./data/users/role/data";
import { delay } from "@/lib/utils";

export const seed = protectedProcedure.mutation(async ({ ctx }) => {
  const userId = ctx.session.user.id;
  const db = ctx.db;
  let testUser: User;
  let createdUsers: User[];
  let testProfile: Profile;
  let createdProfiles: Profile[];
  let testCompanies: Company[];
  let createdJobApplications: JobApplication[];
  let createdQuestions: Question[];
  let createdLocations: Location[];
  let createdProjects: Project[];
  let createdWorkHistory: WorkHistory[];
  let createdInterviews: Interview[];
  let createdAnswers: Answer[];
  let answerId: string;
  let createdMedia: Media;
  let createdAssignments: Assignment[];
  let createdJobApplicationAnswer: JobApplicationAnswer;
  let createdJobApplicationQuestions: JobApplicationQuestion[];
  let createdAssignmentQuestions: AssignmentQuestion[];
  let createdAssignmentSubmissions: AssignmentSubmission[];
  let createdAssignmentSubmissionAnswers: AssignmentSubmissionAnswer[];
  let createdPlacements: Placement[];
  let createdPlacementFeedback: PlacementFeedback[];
  let createdClases: Class[];
  let createdClassApplications: ClassApplication[];
  let createdClassApplicationQuestions: ClassApplicationQuestion[];
  let createdEnrollments: Enrollment[];
  let createdClassApplicationResponses: ClassApplicationResponse[];
  let createdComments: Comment[];
  let createdAdminComments: AdminComment[];
  let createdEvents: Event[];
  let createdEventAttendees: EventAttendee[];
  let createdEventCompanies: EventCompany[];
  let createdVenueContactInfo: VenueContactInfo[];
  let createdSections: Section[];
  let createdProjectCollaborations: ProjectCollaborator[];
  let createdTags: Tag[];
  let createdUserSkills: UserSkill[];
  let createdWallets: Wallet[];
  let createdRoles: Role[];
  let createdCompanyContacts: CompanyContact[];

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
  await db.$transaction(async (tx) => {
    try {
      console.log("Seeding User...");
      // Create test users
      testUser = await tx.user.create({
        data: TEST_USER_DATA,
      });

      console.log("Seeding Locations...");
      createdLocations = await Promise.all(
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

      console.log("Seeding Additional Users...");
      // Create additional test users
      const otherUsers = await Promise.all(
        TEST_USERS.map((user) =>
          tx.user.create({
            data: user,
          })
        )
      );

      createdUsers = [testUser, ...otherUsers];

      console.log("Seeding Profiles...");
      createdProfiles = await Promise.all(
        TEST_PROFILES.map((profile, index) =>
          tx.profile.create({
            data: {
              ...profile,
              createdById: testUser.id,
              updatedById: testUser.id,
              userId: createdUsers[index].id,
            },
          })
        )
      );

      testProfile = createdProfiles[0];

      console.log("Seeding Companies...");
      testCompanies = await Promise.all(
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

      console.log("Seeding Company Contacts...");
      createdCompanyContacts = await Promise.all(
        TEST_COMPANY_CONTACTS.map((companyContact) =>
          tx.companyContact.create({
            data: {
              title: companyContact.title,
              department: companyContact.department,
              isPrimary: companyContact.isPrimary,
              engagementLevel: companyContact.engagementLevel,
              lastContactDate: companyContact.lastContactDate,
              notes: companyContact.notes,
              createdById: testUser.id,
              updatedById: testUser.id,
              companyId: testCompanies[0].id,
              profileId: testProfile.id,
              userId: testUser.id,
            },
          })
        )
      );

      console.log("Seeding Industries...");
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

      console.log("Seeding Media...");
      createdMedia = await tx.media.create({
        data: {
          storageType: "LOCAL",
          title: "Resume",
          type: "PDF",
          url: "https://www.example.com/resume.pdf",
          createdById: testUser.id,
          updatedById: testUser.id,
        },
      });

      console.log("Seeding Questions...");
      createdQuestions = await Promise.all(
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

      const questionId = createdQuestions[0].id;

      const answer = await tx.answer.create({
        data: {
          value: "John Doe",
          createdById: testUser.id,
          updatedById: testUser.id,
          questionId,
          answererId: testProfile.id,
        },
      });

      answerId = answer.id;

      console.log("Seeding Job Postings...");
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
              companyId: testCompanies[0].id,
              hiringManagerId: testProfile.id,
            },
          })
        )
      );

      console.log("Seeding Job Posting Industries...");
      await tx.jobPostingIndustry.create({
        data: {
          industryId: testIndustry[0].id,
          jobPostingId: jobPostings[0].id,
          createdById: testUser.id,
          updatedById: testUser.id,
        },
      });

      console.log("Seeding Job Applications...");
      createdJobApplications = await Promise.all(
        TEST_JOB_APPLICATIONS.map((jobApplication) =>
          tx.jobApplication.create({
            data: {
              ...jobApplication,
              jobPostingId: jobPostings[0].id,
              createdById: testUser.id,
              updatedById: testUser.id,
              applicantId: testProfile.id,
              resumeId: createdMedia.id,
              status: jobApplication.status as JobApplicationStatus,
            },
          })
        )
      );

      console.log("Seeding Work History...");
      createdWorkHistory = await Promise.all(
        TEST_WORK_HISTORY.map((workHistory) =>
          tx.workHistory.create({
            data: {
              companyName: workHistory.companyName,
              title: workHistory.title,
              description: workHistory.description,
              startDatetime: workHistory.startDatetime,
              endDatetime: workHistory.endDatetime,
              isCurrent: workHistory.isCurrent,
              location: workHistory.location,
              employmentType: workHistory.employmentType,
              achievements: workHistory.achievements,
              references: workHistory.references,
              verified: workHistory.verified,
              createdById: testUser.id,
              updatedById: testUser.id,
              profileId: testProfile.id,
              companyId: testCompanies[0].id,
            },
          })
        )
      );

      console.log("Seeding Job Application Questions...");
      createdJobApplicationQuestions = await Promise.all(
        TEST_JOB_APPLICATION_QUESTIONS.map((jobApplicationQuestion) =>
          tx.jobApplicationQuestion.create({
            data: {
              ...jobApplicationQuestion,
              createdById: testUser.id,
              updatedById: testUser.id,
              jobApplicationId: createdJobApplications[0].id,
              questionId,
            },
          })
        )
      );

      createdJobApplicationAnswer = await tx.jobApplicationAnswer.create({
        data: {
          jobApplicationId: createdJobApplications[0].id,
          questionId,
          answerId,
          jobApplicationQuestionId: createdJobApplicationQuestions[0].id,
          createdById: testUser.id,
          updatedById: testUser.id,
        },
      });

      console.log("Seeding Interviews...");
      createdInterviews = await Promise.all(
        TEST_INTERVIEWS.map((interview) =>
          tx.interview.create({
            data: {
              type: interview.type as InterviewType,
              scheduledDate: interview.scheduledDate,
              durationMinutes: interview.durationMinutes,
              interviewLocationType:
                interview.interviewLocationType as InterviewLocationType,
              preparationNotes: interview.preparationNotes,
              status: interview.status as InterviewStatus,
              feedback: interview.feedback,
              candidateFeedback: interview.candidateFeedback,
              nextSteps: interview.nextSteps,
              createdById: testUser.id,
              updatedById: testUser.id,
              intervieweeId: testProfile.id,
              jobApplicationId: createdJobApplications[0].id,
              companyContactId: createdCompanyContacts[0].id,
            },
          })
        )
      );

      console.log("Seeding Answers...");
      createdAnswers = await Promise.all(
        TEST_ANSWERS.map((answer, index) =>
          tx.answer.create({
            data: {
              ...answer,
              createdById: testUser.id,
              updatedById: testUser.id,
              answererId: testProfile.id,
              questionId: createdQuestions[index].id,
            },
          })
        )
      );
    } catch (error) {
      console.error("Error seeding database:", error);
      throw error;
    }
  });

  await delay(1000);

  await db.$transaction(async (tx) => {
    console.log("Seeding Placements...");
    createdPlacements = await Promise.all(
      TEST_PLACEMENTS.map((placement) =>
        tx.placement.create({
          data: {
            ...placement,
            createdById: testUser.id,
            updatedById: testUser.id,
            placementFacilitatorId: testProfile.id,
            companyId: testCompanies[0].id,
            jobApplicationId: createdJobApplications[0].id,
            profileId: testProfile.id,
          },
        })
      )
    );

    console.log("Seeding Placement Feedback...");
    createdPlacementFeedback = await Promise.all(
      TEST_PLACEMENTS_FEEDBACK.map((placementFeedback) =>
        tx.placementFeedback.create({
          data: {
            ...placementFeedback,
            createdById: testUser.id,
            updatedById: testUser.id,
            placementId: createdPlacements[0].id,
            respondentId: testProfile.id,
          },
        })
      )
    );

    console.log("Seeding Classes...");
    createdClases = await Promise.all(
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

    console.log("Seeding Class Applications...");
    createdClassApplications = await Promise.all(
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

    console.log("Seeding Class Application Questions...");
    createdClassApplicationQuestions = await Promise.all(
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

    console.log("Seeding Class Application Responses...");
    createdClassApplicationResponses = await Promise.all(
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

    const classApplicationAnswer = await tx.classApplicationAnswer.create({
      data: {
        questionId: createdQuestions[0].id,
        answerId,
        classApplicationQuestionId: createdClassApplicationQuestions[0].id,
        createdById: testUser.id,
        updatedById: testUser.id,
      },
    });

    console.log("Seeding Assignments...");
    createdAssignments = await Promise.all(
      TEST_ASSIGNMENTS.map((assignment) =>
        tx.assignment.create({
          data: {
            ...assignment,
            createdById: testUser.id,
            updatedById: testUser.id,
            classId: createdClases[0].id,
          },
        })
      )
    );

    console.log("Seeding Assignment Questions...");
    createdAssignmentQuestions = await Promise.all(
      TEST_ASSIGNMENT_QUESTIONS.map((assignmentQuestion) =>
        tx.assignmentQuestion.create({
          data: {
            ...assignmentQuestion,
            createdById: testUser.id,
            updatedById: testUser.id,
            assignmentId: createdAssignments[0].id,
            questionId: createdQuestions[0].id,
          },
        })
      )
    );

    console.log("Seeding Assignment Submissions...");
    createdAssignmentSubmissions = await Promise.all(
      TEST_ASSIGNMENT_SUBMISSIONS.map((assignmentSubmission) =>
        tx.assignmentSubmission.create({
          data: {
            status: assignmentSubmission.status,
            submissionText: assignmentSubmission.submissionText,
            submissionUrl: assignmentSubmission.submissionUrl,
            score: assignmentSubmission.score,
            feedback: assignmentSubmission.feedback,
            createdById: testUser.id,
            updatedById: testUser.id,
            assignmentId: createdAssignments[0].id,
            submitterId: testProfile.id,
            gradedById: testProfile.id,
          },
        })
      )
    );

    console.log("Seeding Assignment Submission Answers...");
    createdAssignmentSubmissionAnswers = await Promise.all(
      TEST_ASSIGNMENT_ANSWERS.map((assignmentSubmissionAnswer) =>
        tx.assignmentSubmissionAnswer.create({
          data: {
            ...assignmentSubmissionAnswer,
            createdById: testUser.id,
            updatedById: testUser.id,
            assignmentSubmissionId: createdAssignmentSubmissions[0].id,
            questionId: createdQuestions[0].id,
            submitterId: testProfile.id,
            assignmentQuestionId: createdAssignmentQuestions[0].id,
          },
        })
      )
    );

    console.log("Seeding Enrollments...");
    createdEnrollments = await Promise.all(
      TEST_ENROLLMENTS.map((enrollment) =>
        tx.enrollment.create({
          data: {
            ...enrollment,
            createdById: testUser.id,
            updatedById: testUser.id,
            classId: createdClases[0].id,
            studentId: testProfile.id,
          },
        })
      )
    );
  });

  await delay(1000);

  await db.$transaction(async (tx) => {
    console.log("Seeding Comments...");
    createdComments = await Promise.all(
      TEST_COMMENTS.map((comment) =>
        tx.comment.create({
          data: {
            ...comment,
            createdById: testUser.id,
            updatedById: testUser.id,
            commenterId: testProfile.id,
          },
        })
      )
    );

    console.log("Seeding Admin Comments...");
    createdAdminComments = await Promise.all(
      TEST_ADMIN_COMMENTS.map((adminComment) =>
        tx.adminComment.create({
          data: {
            ...adminComment,
            createdById: testUser.id,
            updatedById: testUser.id,
            commentId: createdComments[0].id,
          },
        })
      )
    );

    console.log("Seeding Events...");
    createdEvents = await Promise.all(
      TEST_EVENTS.map((event) =>
        tx.event.create({
          data: {
            ...event,
            createdById: testUser.id,
            updatedById: testUser.id,
            organizerId: testProfile.id,
            locationId: createdLocations[0].id,
          },
        })
      )
    );

    console.log("Seeding Event Attendees...");
    createdEventAttendees = await Promise.all(
      TEST_EVENT_ATTENDEES.map((eventAttendee) =>
        tx.eventAttendee.create({
          data: {
            ...eventAttendee,
            createdById: testUser.id,
            updatedById: testUser.id,
            attendeeId: testProfile.id,
            eventId: createdEvents[0].id,
          },
        })
      )
    );

    console.log("Seeding Event Companies...");
    createdEventCompanies = await Promise.all(
      TEST_EVENT_COMPANIES.map((eventCompany) =>
        tx.eventCompany.create({
          data: {
            ...eventCompany,
            createdById: testUser.id,
            updatedById: testUser.id,
            eventId: createdEvents[0].id,
            companyId: testCompanies[0].id,
          },
        })
      )
    );

    console.log("Seeding Venue Contact Info...");
    createdVenueContactInfo = await Promise.all(
      TEST_VENUE_CONTACT_INFO.map((venueContactInfo) =>
        tx.venueContactInfo.create({
          data: {
            ...venueContactInfo,
            createdById: testUser.id,
            updatedById: testUser.id,
            locationId: createdLocations[0].id,
          },
        })
      )
    );

    console.log("Seeding Sections...");
    createdSections = await Promise.all(
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

    console.log("Seeding Projects...");
    createdProjects = await Promise.all(
      TEST_PROJECTS.map((project, index) =>
        tx.project.create({
          data: {
            title: project.title,
            description: project.description,
            shortDescription: project.shortDescription,
            visibility: project.visibility,
            status: project.status,
            startDatetime: project.startDatetime,
            endDatetime: project.endDatetime,
            createdById: createdUsers[index].id,
            updatedById: createdUsers[index].id,
            ownerId: testProfile.id,
            classId: createdClases[0].id,
          },
        })
      )
    );

    console.log("Seeding Project Collaborators...");
    createdProjectCollaborations = await Promise.all(
      TEST_PROJECT_COLLABORATIONS.map((projectCollaboration) =>
        tx.projectCollaborator.create({
          data: {
            role: projectCollaboration.role,
            contributions: projectCollaboration.contributions,
            createdById: testUser.id,
            updatedById: testUser.id,
            projectId: createdProjects[0].id,
            profileId: testProfile.id,
            userId: createdUsers[0].id,
          },
        })
      )
    );

    console.log("Seeding Tags...");
    createdTags = await Promise.all(
      TEST_TAGS.map((tag) =>
        tx.tag.create({
          data: {
            ...tag,
            createdById: testUser.id,
            updatedById: testUser.id,
          },
        })
      )
    );

    console.log("Seeding User Skills...");
    createdUserSkills = await Promise.all(
      TEST_USER_SKILLS.map((userSkill) =>
        tx.userSkill.create({
          data: {
            ...userSkill,
            createdById: testUser.id,
            updatedById: testUser.id,
            tagId: createdTags[0].id,
            profileId: testProfile.id,
          },
        })
      )
    );

    console.log("Seeding Wallets...");
    createdWallets = await Promise.all(
      TEST_WALLETS.map((wallet) =>
        tx.wallet.create({
          data: {
            ...wallet,
            createdById: testUser.id,
            updatedById: testUser.id,
            profileId: testProfile.id,
          },
        })
      )
    );

    console.log("Seeding User Roles...");
    createdRoles = await Promise.all(
      TEST_USER_ROLES.map((userRole) =>
        tx.role.create({
          data: {
            ...userRole,
            createdById: testUser.id,
            updatedById: testUser.id,
            profileId: testProfile.id,
            companyId: testCompanies[0].id,
          },
        })
      )
    );
  });

  await delay(1000);

  await db.$transaction(async (tx) => {
    // Add remaining connections

    console.log("Connecting answers to tags...");
    await tx.answer.update({
      where: { id: answerId },
      data: {
        tags: {
          connect: createdTags.map((tag) => ({ id: tag.id })),
        },
      },
    });

    console.log("Connecting assignments to tags...");
    await Promise.all(
      createdAssignments.map((assignment) =>
        tx.assignment.update({
          where: { id: assignment.id },
          data: {
            tags: {
              connect: createdTags.map((tag) => ({ id: tag.id })),
            },
          },
        })
      )
    );
  });

  await delay(1000);

  await db.$transaction(async (tx) => {
    console.log("Connecting classes to teachers and TAs...");
    await Promise.all(
      createdClases.map((cl) =>
        tx.class.update({
          where: { id: cl.id },
          data: {
            teachers: {
              connect: createdUsers.map((user) => ({ id: user.id })),
            },
            teachingAssistants: {
              connect: createdUsers.map((user) => ({ id: user.id })),
            },
          },
        })
      )
    );

    console.log("Connecting companies to projects...");
    await Promise.all(
      testCompanies.map((company) =>
        tx.company.update({
          where: { id: company.id },
          data: {
            projects: {
              connect: createdProjects.map((project) => ({ id: project.id })),
            },
          },
        })
      )
    );
  });

  await delay(1000);

  await db.$transaction(async (tx) => {
    console.log("Connecting company contacts to roles...");
    await Promise.all(
      createdCompanyContacts.map((contact) =>
        tx.companyContact.update({
          where: { id: contact.id },
          data: {
            roles: {
              connect: createdRoles.map((role) => ({ id: role.id })),
            },
          },
        })
      )
    );

    console.log("Connecting events to tags...");
    await Promise.all(
      createdEvents.map((event) =>
        tx.event.update({
          where: { id: event.id },
          data: {
            tags: {
              connect: createdTags.map((tag) => ({ id: tag.id })),
            },
          },
        })
      )
    );

    console.log("Connecting profiles to tags...");
    await Promise.all(
      createdProfiles.map((profile) =>
        tx.profile.update({
          where: { id: profile.id },
          data: {
            tags: {
              connect: createdTags.map((tag) => ({ id: tag.id })),
            },
          },
        })
      )
    );
  });

  await delay(1000);

  await db.$transaction(async (tx) => {
    console.log("Connecting projects to tags...");
    await Promise.all(
      createdProjects.map((project) =>
        tx.project.update({
          where: { id: project.id },
          data: {
            tags: {
              connect: createdTags.map((tag) => ({ id: tag.id })),
            },
          },
        })
      )
    );

    console.log("Connecting user skills to projects...");
    await Promise.all(
      createdUserSkills.map((skill) =>
        tx.userSkill.update({
          where: { id: skill.id },
          data: {
            projects: {
              connect: createdProjects.map((project) => ({ id: project.id })),
            },
          },
        })
      )
    );

    console.log("Connecting project collaborators to tags...");
    await Promise.all(
      createdProjectCollaborations.map((collaboration) =>
        tx.projectCollaborator.update({
          where: { id: collaboration.id },
          data: {
            tags: {
              connect: createdTags.map((tag) => ({ id: tag.id })),
            },
          },
        })
      )
    );

    console.log("Connecting questions to tags...");
    await Promise.all(
      createdQuestions.map((question) =>
        tx.question.update({
          where: { id: question.id },
          data: {
            tags: {
              connect: createdTags.map((tag) => ({ id: tag.id })),
            },
          },
        })
      )
    );
  });

  await delay(1000);

  await db.$transaction(async (tx) => {
    console.log("Connecting user skills to work history...");
    await Promise.all(
      createdWorkHistory.map((workHistory) =>
        tx.workHistory.update({
          where: { id: workHistory.id },
          data: {
            skills: {
              connect: createdUserSkills.map((skill) => ({ id: skill.id })),
            },
          },
        })
      )
    );

    console.log("Connecting assignment submissions to files...");
    await Promise.all(
      createdAssignmentSubmissions.map((submission) =>
        tx.assignmentSubmission.update({
          where: { id: submission.id },
          data: {
            files: {
              connect: { id: createdMedia.id },
            },
          },
        })
      )
    );

    console.log("Connecting companies to tags...");
    await Promise.all(
      testCompanies.map((company) =>
        tx.company.update({
          where: { id: company.id },
          data: {
            industries: {
              connect: createdTags.map((tag) => ({ id: tag.id })),
            },
          },
        })
      )
    );

    console.log("Connecting interviews to interviewers...");
    await Promise.all(
      createdInterviews.map((interview) =>
        tx.interview.update({
          where: { id: interview.id },
          data: {
            interviewers: {
              connect: createdProfiles.map((profile) => ({ id: profile.id })),
            },
          },
        })
      )
    );
  });

  await delay(1000);

  await db.$transaction(async (tx) => {
    console.log("Connecting media to projects...");
    await tx.media.update({
      where: { id: createdMedia.id },
      data: {
        projects: {
          connect: createdProjects.map((project) => ({ id: project.id })),
        },
      },
    });

    console.log("Connecting user skills to endorsements...");
    await Promise.all(
      createdUserSkills.map((skill) =>
        tx.userSkill.update({
          where: { id: skill.id },
          data: {
            endorsedBy: {
              connect: createdProfiles.map((profile) => ({ id: profile.id })),
            },
          },
        })
      )
    );

    return { success: true };
  });
});

export const checkEmptyTables = protectedProcedure.mutation(async ({ ctx }) => {
  const db = ctx.db;

  // Get all table names
  const tables = await db.$queryRaw<{ table_name: string }[]>`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
  `;

  const tablesWithoutUnderscores = tables
    // .filter((t) => !t.table_name.startsWith("_"))
    .map((t) => t.table_name);

  console.log("All tables:", tablesWithoutUnderscores);

  // Check each table
  const emptyTables = await Promise.all(
    tablesWithoutUnderscores.map(async (tableName) => {
      const query = `SELECT COUNT(*) as count FROM "${tableName}"`;
      const count = await db.$queryRaw<{ count: bigint }[]>(
        Prisma.sql([query])
      );
      return {
        tableName,
        isEmpty: count[0].count === BigInt(0),
      };
    })
  );

  const filteredEmptyTables = emptyTables
    .filter((table) => table.isEmpty)
    .filter(
      (table) =>
        !["Account", "Session", "VerificationToken", "Authenticator"].includes(
          table.tableName
        )
    )
    .map((table) => table.tableName);

  console.log("Empty tables:", filteredEmptyTables, filteredEmptyTables.length);

  // Return only the names of empty tables
  return emptyTables
    .filter((table) => table.isEmpty)
    .map((table) => table.tableName);
});
