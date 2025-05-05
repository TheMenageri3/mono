import { createTRPCRouter } from "@/server/api/trpc";
import { createClassApplicationQuestion } from "./create";
import {
  deleteClassApplicationQuestion,
  restoreClassApplicationQuestion,
} from "./delete";
import { updateClassApplicationQuestion } from "./update";
import {
  getClassApplicationQuestionById,
  getClassApplicationQuestionsByClassApplicationId,
  getDeletedClassApplicationQuestions,
} from "./read";

export const classApplicationQuestionRouter = createTRPCRouter({
  create: createClassApplicationQuestion,
  getById: getClassApplicationQuestionById,
  getQuestionByApplication: getClassApplicationQuestionsByClassApplicationId,
  readDeleted: getDeletedClassApplicationQuestions,
  update: updateClassApplicationQuestion,
  delete: deleteClassApplicationQuestion,
  restore: restoreClassApplicationQuestion,
});
