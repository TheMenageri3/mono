import { api, RouterInputs } from "@/trpc/react";
import { string, type z } from "zod";
import {
    readAdminCommentsSchema,
    readDeletedAdminCommentsSchema,
    getAdminCommentByIdSchema,
    getAdminCommentByDataSchema,
} from "@/schemas";

type ReadAdminCommentsInput = z.infer<typeof readAdminCommentsSchema>;
type ReadDeletedAdminCommentsInput = z.infer<typeof readDeletedAdminCommentsSchema>;
type GetAdminCommentByIdInput = z.infer<typeof getAdminCommentByIdSchema>;
type GetAdminCommentByDataInput = z.infer<typeof getAdminCommentByDataSchema>;

export const useAdminCommentQueries = () => {
    const useAllAdminComments = (
        input: ReadAdminCommentsInput = { limit: 10, offset: 0 }
    ) => {
        return api.adminComment.read.useQuery(input);
    };

    const useDeletedAdminComments = (
        input: ReadDeletedAdminCommentsInput = { limit: 10, offset: 0 }
    ) => {
        return api.adminComment.readDeleted.useQuery(input);
    };

    const useAdminCommentById = (
        input: GetAdminCommentByIdInput = { id: "" }
    ) => {
        return api.adminComment.readById.useQuery(input);
    };

    const useAdminCommentByData = (
        input: GetAdminCommentByDataInput = {
            visibility: "ADMIN_ONLY" ,
            category: "FEEDBACK",
            priority: "NORMAL",
            resolved: false,
            commentId: "",
            limit: 10,
            offset: 0
        }
    ) => {
        return api.adminComment.readByData.useQuery(input);
    };

    return {
        useAllAdminComments,
        useDeletedAdminComments,
        useAdminCommentById,
        useAdminCommentByData,
    };
};