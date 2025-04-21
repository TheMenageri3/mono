import { createTRPCRouter } from "@/server/api/trpc";
import { createComment } from "./create";
import {
    readCommentById,
    readCommentByClassApplicationId,
    readCommentByAssignmentId,
    readCommentByAdminCommentId,
    readCommentByParentCommentId,
} from "./read";
import { updateComment } from "./update";
import { deleteComment, restoreComment } from "./delete";

export const commentRouter = createTRPCRouter({
    create: createComment,
    readById: readCommentById,
    readByClassApplicationId: readCommentByClassApplicationId,
    readByAssignmentId: readCommentByAssignmentId,
    readByAdminCommentId: readCommentByAdminCommentId,
    readByParentCommentId: readCommentByParentCommentId,
    update: updateComment,
    delete: deleteComment,
    restore: restoreComment,
});