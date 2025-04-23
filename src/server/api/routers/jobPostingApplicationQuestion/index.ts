import { createTRPCRouter } from "@/server/api/trpc";
import { createJobPostingApplicationQuestion } from "./create";
import { readJobPostingApplicationQuestions, getJobPostingApplicationQuestionById, readDeletedJobPostingApplicationQuestions } from "./read";
import { updateJobPostingApplicationQuestion } from "./update";
import { deleteJobPostingApplicationQuestion, restoreJobPostingApplicationQuestion } from "./delete";

export const jobPostingApplicationQuestionRouter = createTRPCRouter({
  create: createJobPostingApplicationQuestion,
  read: readJobPostingApplicationQuestions,
  readDeleted: readDeletedJobPostingApplicationQuestions,
  getById: getJobPostingApplicationQuestionById,
  update: updateJobPostingApplicationQuestion,
  delete: deleteJobPostingApplicationQuestion,
  restore: restoreJobPostingApplicationQuestion,
});
