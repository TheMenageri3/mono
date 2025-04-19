import { createTRPCRouter } from "@/server/api/trpc";
import { createClassApplicationAnswer } from "./create";
import { updateClassApplicationAnswer } from "./update";
import {
  deleteClassApplicationAnswer,
  restoreClassApplicationAnswer,
} from "./delete";
import {
  getClassApplicationAnswerById,
  getClassApplicationAnswerByQuestionId,
  getClassApplicationAnswersByClassApplicationQuestionId,
  getClassApplicationAnswersByClassApplicationResponseId,
  getDeletedClassApplicationAnswers,
} from "./read";

export const classApplicationAnswerRouter = createTRPCRouter({
  create: createClassApplicationAnswer,
  update: updateClassApplicationAnswer,
  delete: deleteClassApplicationAnswer,
  restore: restoreClassApplicationAnswer,
  getById: getClassApplicationAnswerById,
  getByQuestionId: getClassApplicationAnswerByQuestionId,
  getByClassApplicationQuestionId:
    getClassApplicationAnswersByClassApplicationQuestionId,
  getByClassApplicationResponseId:
    getClassApplicationAnswersByClassApplicationResponseId,
  getDeleted: getDeletedClassApplicationAnswers,
});
