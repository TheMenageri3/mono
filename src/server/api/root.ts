import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { adminCommentRouter } from "./routers/adminComment";
import { answerRouter } from "./routers/answer";
import { assignmentRouter } from "./routers/assignment";
import { assignmentQuestionRouter } from "./routers/assignmentQuestion";
import { assignmentSubmissionRouter } from "./routers/assignmentSubmission";
import { assignmentSubmissionAnswerRouter } from "./routers/assignmentSubmissionAnswer";
import { classRouter } from "./routers/class";
import { classApplicationRouter } from "./routers/classApplication";
import { classApplicationAnswerRouter } from "./routers/classApplicationAnswer";
import { classApplicationQuestionRouter } from "./routers/classApplicationQuestion";
import { classApplicationResponseRouter } from "./routers/classApplicationResponse";
import { commentRouter } from "./routers/comment";
import { companyRouter } from "./routers/company";
import { companyContactRouter } from "./routers/companyContact/index";
import { enrollmentRouter } from "./routers/enrollment";
import { eventRouter } from "./routers/event";
import { eventAttendeeRouter } from "./routers/eventAttendee";
import { eventCompanyRouter } from "./routers/eventCompany";
import { industryRouter } from "./routers/industry";
import { interviewRouter } from "./routers/interview";
import { jobApplicationRouter } from "./routers/jobApplication";
import { jobApplicationQuestionRouter } from "./routers/jobApplicationQuestion";
import { jobPostingRouter } from "./routers/jobPosting";
import { locationRouter } from "./routers/location";
import { mediaRouter } from "./routers/media";

import { seedRouter } from "./routers/seed";

import { placementRouter } from "./routers/placement";
import { placementFeedbackRouter } from "./routers/placementFeedback";
import { profileRouter } from "./routers/profile";
import { projectRouter } from "./routers/project";
import { projectCollaboratorRouter } from "./routers/projectCollaborator";
import { questionRouter } from "./routers/question";
import { roleRouter } from "./routers/role";
import { sectionRouter } from "./routers/section";
import { tagRouter } from "./routers/tag";
import { userRouter } from "./routers/user";
import { userSkillRouter } from "./routers/userSkill";
import { venueContactInfoRouter } from "./routers/venueContactInfo";
import { walletRouter } from "./routers/wallet";
import { workHistoryRouter } from "./routers/workHistory";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  adminComment: adminCommentRouter,
  answer: answerRouter,
  assignment: assignmentRouter,
  assignmentQuestion: assignmentQuestionRouter,
  assignmentSubmission: assignmentSubmissionRouter,
  assignmentSubmissionAnswer: assignmentSubmissionAnswerRouter,
  class: classRouter,
  classApplication: classApplicationRouter,
  classApplicationAnswer: classApplicationAnswerRouter,
  classApplicationQuestion: classApplicationQuestionRouter,
  classApplicationResponse: classApplicationResponseRouter,
  comment: commentRouter,
  company: companyRouter,
  companyContact: companyContactRouter,
  enrollment: enrollmentRouter,
  event: eventRouter,
  eventAttendee: eventAttendeeRouter,
  eventCompany: eventCompanyRouter,
  industry: industryRouter,
  interview: interviewRouter,
  jobApplication: jobApplicationRouter,
  jobApplicationQuestion: jobApplicationQuestionRouter,
  jobPosting: jobPostingRouter,
  location: locationRouter,
  media: mediaRouter,
  seed: seedRouter,
  placement: placementRouter,
  placementFeedback: placementFeedbackRouter,
  profile: profileRouter,
  project: projectRouter,
  projectCollaborator: projectCollaboratorRouter,
  question: questionRouter,
  role: roleRouter,
  section: sectionRouter,
  tag: tagRouter,
  user: userRouter,
  userSkill: userSkillRouter,
  venueContactInfo: venueContactInfoRouter,
  wallet: walletRouter,
  workHistory: workHistoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
