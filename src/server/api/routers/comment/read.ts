import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

// 01. Get comment by ID : NON-DELETED
const readCommentById = protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
            const comment = await ctx.db.comment.findUniqueOrThrow({
                where: {
                    id: input.id,
                    deletedAt: null,
                },
                include: {
                    commenter: true,
                },
            });
            return comment;
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Comment with ID ${input.id} was not found.`,
                cause: error,
            });
        }
    });

// 02. Get comment by classApplicationId : NON-DELETED
const readCommentByClassApplicationId = protectedProcedure
    .input(z.object({ classApplicationId: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
            const comment = await ctx.db.comment.findMany({
                where: {
                    classApplicationId: input.classApplicationId,
                    deletedAt: null,
                },
                include: {
                    commenter: true,
                },
            });
            return comment;
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Comment with classApplication ID ${input.classApplicationId} was not found.`,
                cause: error,
            });
        }
    });

// 03. Get comment by assignmentID : NON-DELETED
const readCommentByAssignmentId = protectedProcedure
    .input(z.object({ assignmentId: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
            const comment = await ctx.db.comment.findMany({
                where: {
                    assignmentId: input.assignmentId,
                    deletedAt: null,
                },
                include: {
                    commenter: true,
                },
            });
            return comment;
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Comment with assignment ID ${input.assignmentId} was not found.`,
                cause: error,
            });
        }
    });

// 04. Get comment by adminCommentId : NON-DELETED
const readCommentByAdminCommentId = protectedProcedure
    .input(z.object({ adminCommentId: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
            const comment = await ctx.db.comment.findMany({
                where: {
                    adminCommentId: input.adminCommentId,
                    deletedAt: null,
                },
                include: {
                    commenter: true,
                },
            });
            return comment;
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Comment with adminComment ID ${input.adminCommentId} was not found.`,
                cause: error,
            });
        }
    });

// 05. Get comment by parentCommentId : NON-DELETED
const readCommentByParentCommentId = protectedProcedure
    .input(z.object({ parentCommentId: z.string() }))
    .query(async ({ ctx, input }) => {
        try {
            const comment = await ctx.db.comment.findMany({
                where: {
                    parentCommentId: input.parentCommentId,
                    deletedAt: null,
                },
                include: {
                    commenter: true,
                },
            });
            return comment;
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `Comment with parentComment ID ${input.parentCommentId} was not found.`,
                cause: error,
            });
        }
    });

export {
    readCommentById,
    readCommentByClassApplicationId,
    readCommentByAssignmentId,
    readCommentByAdminCommentId,
    readCommentByParentCommentId,
}