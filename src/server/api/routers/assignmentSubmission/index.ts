import { createTRPCRouter } from "@/server/api/trpc";
import { createAssignmentSubmission } from "./create";
import { readAssignmentSubmissions, getAssignmentSubmissionById } from "./read";
import { updateAssignmentSubmission } from "./update";
import {
  deleteAssignmentSubmission,
  restoreAssignmentSubmission,
} from "./delete";

export const assignmentSubmissionRouter = createTRPCRouter({
  create: createAssignmentSubmission,
  read: readAssignmentSubmissions,
  readById: getAssignmentSubmissionById,
  update: updateAssignmentSubmission,
  delete: deleteAssignmentSubmission,
  restore: restoreAssignmentSubmission,
});
