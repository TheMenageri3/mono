import { read, search } from "~/server/api/routers/company/read";
import { createTRPCRouter } from "~/server/api/trpc";

export const companyRouter = createTRPCRouter({
  read: read,
  search: search,
});
