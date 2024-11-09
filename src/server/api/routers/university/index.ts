import { read, search } from "~/server/api/routers/university/read";
import { createTRPCRouter } from "~/server/api/trpc";

export const universityRouter = createTRPCRouter({
  read: read,
  search: search,
});
