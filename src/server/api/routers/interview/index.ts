import { createTRPCRouter } from "@/server/api/trpc";
import { createInterview } from "./create";
import {
  readInterviews,
  readDeletedInterviews,
  getInterviewById,
  getInterviewByData,
} from "./read";
import { updateInterview } from "./update";
import { deleteInterview, restoreInterview } from "./delete";

export const interviewRouter = createTRPCRouter({
  create: createInterview,
  read: readInterviews,
  readDeleted: readDeletedInterviews,
  getById: getInterviewById,
  getByData: getInterviewByData,
  update: updateInterview,
  delete: deleteInterview,
  restore: restoreInterview,
});
