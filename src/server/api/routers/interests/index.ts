import { read, search } from "~/server/api/routers/interests/read";
import { createTRPCRouter } from "~/server/api/trpc";

export const interestsRouter = createTRPCRouter({
  read: read,
  search: search,
});
