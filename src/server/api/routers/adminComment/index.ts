import { createTRPCRouter } from "@/server/api/trpc";
import { createAdminComment } from "./create";
import {
    readAdminComments,
    readDeletedAdminComments,
    getAdminCommentById,
    getAdminCommentByData,
} from "./read";
import { updateAdminComment } from "./update";
import {
    deleteAdminComment,
    restoreAdminComment
} from "./delete";

export const adminCommentRouter = createTRPCRouter({
    create: createAdminComment,
    read: readAdminComments,
    readDeleted: readDeletedAdminComments,
    readById: getAdminCommentById,
    readByData: getAdminCommentByData,
    update: updateAdminComment,
    delete: deleteAdminComment,
    restore: restoreAdminComment,

});