import { createTRPCRouter } from "@/server/api/trpc";
import { createWorkHistory } from "./create";
import { readWorkHistory, getWorkHistoryById, readDeletedWorkHistory } from "./read";
import { updateWorkHistory } from "./update";
import { deleteWorkHistory, restoreWorkHistory } from "./delete";

export const workHistoryRouter = createTRPCRouter({
  create: createWorkHistory,
  read: readWorkHistory,
  getById: getWorkHistoryById,
  readDeleted: readDeletedWorkHistory,
  update: updateWorkHistory,
  delete: deleteWorkHistory,
  restore: restoreWorkHistory,
});
