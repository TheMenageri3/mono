import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { tagRouter } from "./routers/tag";
import { assignmentRouter } from "./routers/assignment";
import { walletRouter } from "./routers/wallet";
import { placementFeedbackRouter } from "./routers/placementFeedback";
import { classroomRouter } from "./routers/classroom";

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
  placementFeedback: placementFeedbackRouter,
  classroom: classroomRouter,
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
