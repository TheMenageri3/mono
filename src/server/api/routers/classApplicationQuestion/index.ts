import { createTRPCRouter } from "@/server/api/trpc";
import { createClassApplicationQuestion } from "./create";
import {
    readClassApplicationQuestionById,
    readClassApplicationQuestionsByClassApplicationId,
    readClassApplicationQuestionsByQuestionId,
    readDeletedClassApplicationQuestionsByClassApplicationId,
} from "./read";
import { updateClassApplicationQuestion } from "./update";
import {
    deleteClassApplicationQuestion,
    restoreClassApplicationQuestion,
} from "./delete";

export const classApplicationQuestionRouter = createTRPCRouter({
    create: createClassApplicationQuestion,
    readById: readClassApplicationQuestionById,
    readByClassApplicationId: readClassApplicationQuestionsByClassApplicationId,
    readDeletedByClassApplicationId:
        readDeletedClassApplicationQuestionsByClassApplicationId,
    readByQuestionId: readClassApplicationQuestionsByQuestionId,
    update: updateClassApplicationQuestion,
    delete: deleteClassApplicationQuestion,
    restore: restoreClassApplicationQuestion,
});
