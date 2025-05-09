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
  getClassApplicationAnswers,
  getClassApplicationAnswersByClassApplicationQuestionId,
  getClassApplicationAnswersByClassApplicationResponseId,
  getDeletedClassApplicationAnswers,
} from "./read";

export const classApplicationAnswerRouter = createTRPCRouter({
  create: createClassApplicationAnswer,
  update: updateClassApplicationAnswer,
  delete: deleteClassApplicationAnswer,
  restore: restoreClassApplicationAnswer,
  readAll: getClassApplicationAnswers,
  readById: getClassApplicationAnswerById,
  readByQuestionId: getClassApplicationAnswerByQuestionId,
  readByClassApplicationQuestionId:
    getClassApplicationAnswersByClassApplicationQuestionId,
  readByClassApplicationResponseId:
    getClassApplicationAnswersByClassApplicationResponseId,
  readDeleted: getDeletedClassApplicationAnswers,
});
