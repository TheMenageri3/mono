import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { CommentStatus } from "@/generated/prisma/client";

const createComment = protectedProcedure
    .input(
        z.object({
            text: z.string(),
            status: z.nativeEnum(CommentStatus),
            commenterId: z.string(),
            assignmentId: z.string().optional(),
            classApplicationId: z.string().optional(),
            adminCommentId: z.string().optional(),
            parentCommentId: z.string().optional(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        try {
            const comment = await ctx.db.comment.create({
                data: {
                    ...input,
                    createdById: userId,
                    updatedById: userId,
                },
            });
            return comment;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create comment",
                cause: error,
            });
        }
    });

export {
    createComment
}