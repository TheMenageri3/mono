
import { createDao } from "~/server/api/routers/dao/create";
import { read } from "~/server/api/routers/dao/read";
import { updateDao } from "~/server/api/routers/dao/update";
import { createTRPCRouter } from "~/server/api/trpc";

export const daoRouter = createTRPCRouter({
  create: createDao,
  read: read,
  updateStatus: updateDao,
});
