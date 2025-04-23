import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { CommentStatus } from "@/generated/prisma/client";

const updateComment = protectedProcedure
    .input(
        z.object({
            id: z.string(),
            data: z.object({
                text: z.string().optional(),
                status: z.nativeEnum(CommentStatus).optional(),
                assignmentId: z.string().optional(),
                classApplicationId: z.string().optional(),
                adminCommentId: z.string().optional(),
                parentCommentId: z.string().optional(),
            }),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        let comment;
        try {
            comment = await ctx.db.comment.findUniqueOrThrow({
                where: { id: input.id },
            });

            if (comment.deletedAt !== null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `Comment with ID ${input.id} has been deleted.`,
                });
            }

            return await ctx.db.comment.update({
                where: { id: input.id },
                data: {
                    ...input.data,
                    updatedById: userId,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Failed to update comment with ID ${input.id}.`,
                cause: error,
            });
        }
    });

export {
    updateComment
}