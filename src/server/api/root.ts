import { projectCollaboratorRouter } from "./routers/collaborator";
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
import { jobPostingApplicationQuestionRouter } from "./routers/jobPostingApplicationQuestion";
import { assignmentSubmissionRouter } from "./routers/assignmentSubmission";
import { eventCompanyRouter } from "./routers/eventCompany";
import { eventAttendeeRouter } from "./routers/eventAttendee";
import { classApplicationAnswerRouter } from "./routers/classApplicationAnswer";
import { mediaRouter } from "./routers/media";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  tag: tagRouter,
  question: questionRouter,
  answer: answerRouter,
  comment: commentRouter,
  assignment: assignmentRouter,
  assignmentSubmissionAnswer: assignmentSubmissionAnswerRouter,
  assignmentSubmission: assignmentSubmissionRouter,
  wallet: walletRouter,
  industry: industryRouter,
  workHistory: workHistoryRouter,
  jobApplication: jobApplicationRouter,
  jobPosting: jobPostingRouter,
  placementFeedback: placementFeedbackRouter,
  class: classRouter,
  classApplication: classApplicationRouter,
  classApplicationResponse: classApplicationResponseRouter,
  assignmentQuestion: assignmentQuestionRouter,
  adminComment: adminCommentRouter,
  project: projectRouter,
  projectCollaborator: projectCollaboratorRouter,
  location: locationRouter,
  userSkill: userSkillRouter,
  role: roleRouter,
  profile: profileRouter,
  company: companyRouter,
  companyContact: companyContactRouter,
  interview: interviewRouter,
  placement: placementRouter,
  enrollment: enrollmentRouter,
  jobPostingApplicationQuestion: jobPostingApplicationQuestionRouter,
  event: eventRouter,
  eventAttendee: eventAttendeeRouter,
  eventCompany: eventCompanyRouter,
  classApplicationAnswer: classApplicationAnswerRouter,
  classApplicationQuestion:classApplicationQuestionRouter
  media: mediaRouter,
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
