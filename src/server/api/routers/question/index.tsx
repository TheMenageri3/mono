import { createTRPCRouter } from "@/server/api/trpc";
import { createQuestion } from "./create";
import { readQuestionById, readAllActiveQuestions, readDeletedQuestions } from "./read";
import { updateQuestion } from "./update";
import { deleteQuestion, restoreQuestion } from "./delete";

export const questionRouter = createTRPCRouter({
    create: createQuestion,
    readAll: readAllActiveQuestions,
    readDeleted: readDeletedQuestions,
    readById: readQuestionById,
    update: updateQuestion,
    delete: deleteQuestion,
    restore: restoreQuestion,
});