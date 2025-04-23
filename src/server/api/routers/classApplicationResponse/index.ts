import { createTRPCRouter } from "@/server/api/trpc";
import { createClassApplicationResponse } from "./create";
import { updateClassApplicationResponse } from "./update";
import { deleteClassApplicationResponse, restoreClassApplicationResponse } from "./delete";
import { getClassApplicationResponseById, getClassApplicationResponses, getClassApplicationResponsesByClassApplication, getClassApplicationResponseByApplicant } from "./read";

export const classApplicationResponseRouter = createTRPCRouter({
    create: createClassApplicationResponse,
    getById: getClassApplicationResponseById,
    getByClassApplication: getClassApplicationResponsesByClassApplication,
    getByApplicant: getClassApplicationResponseByApplicant,
    getAll: getClassApplicationResponses,
    update: updateClassApplicationResponse,
    delete: deleteClassApplicationResponse,
    restore: restoreClassApplicationResponse,
});