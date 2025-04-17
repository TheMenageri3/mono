import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { tagRouter } from "./routers/tag";
import { assignmentRouter } from "./routers/assignment";
import { walletRouter } from "./routers/wallet";
import { workHistoryRouter } from "./routers/workHistory";
import { jobAppicationRouter } from "./routers/jobApplication";
import { jobPostingRouter } from "./routers/jobPosting";
import { placementFeedbackRouter } from "./routers/placementFeedback";
import { classroomRouter } from "./routers/classroom";
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
  workHistory: workHistoryRouter,
  jobAppication: jobAppicationRouter,
  jobPosting: jobPostingRouter,
  placementFeedback: placementFeedbackRouter,
  classroom: classroomRouter,
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
