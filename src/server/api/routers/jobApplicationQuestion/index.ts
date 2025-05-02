import { createTRPCRouter } from "@/server/api/trpc";
import { createJobApplicationQuestion } from "./create";
import {
  readJobApplicationQuestions,
  getJobApplicationQuestionById,
  readDeletedJobApplicationQuestions,
} from "./read";
import { updateJobApplicationQuestion } from "./update";
import {
  deleteJobApplicationQuestion,
  restoreJobApplicationQuestion,
} from "./delete";

export const jobApplicationQuestionRouter = createTRPCRouter({
  create: createJobApplicationQuestion,
  read: readJobApplicationQuestions,
  readDeleted: readDeletedJobApplicationQuestions,
  getById: getJobApplicationQuestionById,
  update: updateJobApplicationQuestion,
  delete: deleteJobApplicationQuestion,
  restore: restoreJobApplicationQuestion,
});
