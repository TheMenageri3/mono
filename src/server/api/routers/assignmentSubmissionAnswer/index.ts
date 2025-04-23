import { createTRPCRouter } from "@/server/api/trpc";
import { createAssignmentSubmissionAnswer } from "./create";
import { readAnswers, getAnswerById } from "./read";
import { updateAssignmentSubmissionAnswer } from "./update";
import {
  deleteAssignmentSubmissionAnswer,
  restoreAssignmentSubmissionAnswer,
} from "./delete";

export const assignmentSubmissionAnswerRouter = createTRPCRouter({
  create: createAssignmentSubmissionAnswer,
  read: readAnswers,
  readById: getAnswerById,
  update: updateAssignmentSubmissionAnswer,
  delete: deleteAssignmentSubmissionAnswer,
  restore: restoreAssignmentSubmissionAnswer,
});
