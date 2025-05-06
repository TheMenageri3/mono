import { createTRPCRouter } from "@/server/api/trpc";
import { createAssignmentQuestions } from "./create";
import {
  getAllAssignmentQuestions,
  readAssignmentQuestions,
  getAssignmentQuestionById,
  readDeletedAssignmentQuestions,
  getSectionsByAssignmentId,
  getAssignmentQuestionsByFilter,
} from "./read";
import {
  updateAssignmentQuestions,
  updateAssignmentQuestionsBulk,
  updateAssignmentQuestionOrder,
} from "./update";
import { deleteAssignmentQuestion, restoreAssignmentQuestion } from "./delete";

export const assignmentQuestionRouter = createTRPCRouter({
  create: createAssignmentQuestions,
  read: readAssignmentQuestions,
  readAll: getAllAssignmentQuestions,
  readDeleted: readDeletedAssignmentQuestions,
  readById: getAssignmentQuestionById,
  readByFilter: getAssignmentQuestionsByFilter,
  getSections: getSectionsByAssignmentId,
  update: updateAssignmentQuestions,
  updateBulk: updateAssignmentQuestionsBulk,
  updateOrder: updateAssignmentQuestionOrder,
  delete: deleteAssignmentQuestion,
  restore: restoreAssignmentQuestion,
});
