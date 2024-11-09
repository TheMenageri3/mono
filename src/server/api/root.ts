import { entryRouter } from "~/server/api/routers/entry";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { devRouter } from "./routers/dev";
import { verificationRequestRouter } from "./routers/verificationRequests";
import { entryRevisionRouter } from "~/server/api/routers/entryRevision";
import { tagRouter } from "~/server/api/routers/tag";
import { sentenceParserRouter } from "~/server/api/routers/sentenceParser";
import { paperReviewRouter } from "~/server/api/routers/paperReview";
import { paperRouter } from "~/server/api/routers/paper";
import { campaignRouter } from "./routers/campaign";
import { backerRouter } from "./routers/backers";

import { bountyRouter } from "~/server/api/routers/bounty";
import { proposalRouter } from "~/server/api/routers/proposal";
import { daoRouter } from "./routers/dao";
import { flickRouter } from "./routers/flick";
import { userRouter } from "./routers/user";
import { companyRouter } from "~/server/api/routers/company";
import { universityRouter } from "~/server/api/routers/university";
import { interestsRouter } from "~/server/api/routers/interests";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  backer: backerRouter,
  bounty: bountyRouter,
  campaign: campaignRouter,
  company: companyRouter,
  dao: daoRouter,
  dev: devRouter,
  entry: entryRouter,
  entryRevision: entryRevisionRouter,
  flick: flickRouter,
  interests: interestsRouter,
  paper: paperRouter,
  paperReview: paperReviewRouter,
  proposal: proposalRouter,
  sentenceParser: sentenceParserRouter,
  tag: tagRouter,
  user: userRouter,
  university: universityRouter,
  verificationRequest: verificationRequestRouter,
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
