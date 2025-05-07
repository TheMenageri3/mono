import { createTRPCRouter } from "@/server/api/trpc";
import { createClassApplicationResponse } from "./create";
import { updateClassApplicationResponse } from "./update";
import {
    deleteClassApplicationResponse,
    restoreClassApplicationResponse,
} from "./delete";
import {
    getClassApplicationResponseByApplicant,
    getClassApplicationResponseById,
    getClassApplicationResponses,
    getClassApplicationResponsesByClassApplication,
} from "./read";

export const classApplicationResponseRouter = createTRPCRouter({
    create: createClassApplicationResponse,
    readById: getClassApplicationResponseById,
    readByClassApplication: getClassApplicationResponsesByClassApplication,
    readByApplicant: getClassApplicationResponseByApplicant,
    readAll: getClassApplicationResponses,
    update: updateClassApplicationResponse,
    delete: deleteClassApplicationResponse,
    restore: restoreClassApplicationResponse,
});
