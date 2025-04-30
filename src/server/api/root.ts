import { projectCollaboratorRouter } from "./routers/projectCollaborator";
import { projectRouter } from "./routers/project";
import { adminCommentRouter } from "./routers/adminComment";
import { assignmentQuestionRouter } from "./routers/assignmentQuestion";
import { locationRouter } from "./routers/location";
import { userSkillRouter } from "./routers/userSkill";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { tagRouter } from "./routers/tag";
import { questionRouter } from "./routers/question";
import { answerRouter } from "./routers/answer";
import { commentRouter } from "./routers/comment";
import { assignmentRouter } from "./routers/assignment";
import { assignmentSubmissionAnswerRouter } from "./routers/assignmentSubmissionAnswer";
import { walletRouter } from "./routers/wallet";
import { industryRouter } from "./routers/industry";
import { workHistoryRouter } from "./routers/workHistory";
import { jobApplicationRouter } from "./routers/jobApplication";
import { jobPostingRouter } from "./routers/jobPosting";
import { placementFeedbackRouter } from "./routers/placementFeedback";
import { classRouter } from "./routers/class";
import { classApplicationRouter } from "./routers/classApplication";
import { classApplicationResponseRouter } from "./routers/classApplicationResponse";
import { roleRouter } from "./routers/role";
import { profileRouter } from "./routers/profile";
import { companyRouter } from "./routers/company";
import { companyContactRouter } from "./routers/companyContact/index";
import { interviewRouter } from "./routers/interview";
import { placementRouter } from "./routers/placement";
import { enrollmentRouter } from "./routers/enrollment";
import { eventRouter } from "./routers/event";
import { jobApplicationQuestionRouter } from "./routers/jobApplicationQuestion";
import { assignmentSubmissionRouter } from "./routers/assignmentSubmission";
import { eventCompanyRouter } from "./routers/eventCompany";
import { eventAttendeeRouter } from "./routers/eventAttendee";
import { classApplicationAnswerRouter } from "./routers/classApplicationAnswer";
import { mediaRouter } from "./routers/media";
import { classApplicationQuestionRouter } from "./routers/classApplicationQuestion";
import { sectionRouter } from "./routers/section";
import { venueContactInfoRouter } from "./routers/venueContactInfo";

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
