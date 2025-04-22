import { createTRPCRouter } from "@/server/api/trpc";
import { createAnswer } from "./create";
import { readAnswerById, readAllAnswers, readDeletedAnswers } from "./read";
import { updateAnswer } from "./update";
import { deleteAnswer, restoreAnswer } from "./delete";

export const answerRouter = createTRPCRouter({
    create: createAnswer,
    readAll: readAllAnswers,
    readDeleted: readDeletedAnswers,
    readById: readAnswerById,
    update: updateAnswer,
    delete: deleteAnswer,
    restore: restoreAnswer,
});