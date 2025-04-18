import { projectRouter } from "./routers/project";
import { adminCommentRouter } from "./routers/adminComment";
import { assignmentQuestionRouter } from "./routers/assignmentQuestion";
import { locationRouter } from "./routers/location";
import { userSkillRouter } from "./routers/userSkill";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { tagRouter } from "./routers/tag";
import { assignmentRouter } from "./routers/assignment";
import { walletRouter } from "./routers/wallet";
import { industryRouter } from "./routers/industry";
import { workHistoryRouter } from "./routers/workHistory";
import { jobApplicationRouter } from "./routers/jobApplication";
import { jobPostingRouter } from "./routers/jobPosting";
import { placementFeedbackRouter } from "./routers/placementFeedback";
import { classroomRouter } from "./routers/classroom";
import { roleRouter } from "./routers/role";
import { profileRouter } from "./routers/profile";
import { companyRouter } from "./routers/company";
import { companyContactRouter } from "./routers/companyContact/index";
import { interviewRouter } from "./routers/interview";
import { placementRouter } from "./routers/placement";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  tag: tagRouter,
  assignment: assignmentRouter,
  wallet: walletRouter,
  industry: industryRouter,
  workHistory: workHistoryRouter,
  jobApplication: jobApplicationRouter,
  jobPosting: jobPostingRouter,
  placementFeedback: placementFeedbackRouter,
  classroom: classroomRouter,
  assignmentQuestion: assignmentQuestionRouter,
  adminComment: adminCommentRouter,
  project: projectRouter,
  location: locationRouter,
  userSkill: userSkillRouter,
  role: roleRouter,
  profile: profileRouter,
  company: companyRouter,
  companyContact: companyContactRouter,
  interview: interviewRouter,
  placement: placementRouter,
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
