import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const deleteComment = protectedProcedure
    .input(
        z.object({ id: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;

        try {
            const comment = await ctx.db.comment.findUniqueOrThrow({
                where: { id: input.id },
            });

            if (comment.deletedAt !== null) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `Comment with ID ${input.id} is already deleted.`,
                });
            }

            return await ctx.db.comment.update({
                where: { id: input.id },
                data: {
                    deletedAt: new Date(),
                    updatedById: userId,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Failed to delete comment with ID ${input.id}.`,
                cause: error,
            });
        }
    });


const restoreComment = protectedProcedure
    .input(
        z.object({ id: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;

        try {
            const comment = await ctx.db.comment.findUniqueOrThrow({
                where: { id: input.id },
            });

            if (comment.deletedAt === null) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `Comment with ID ${input.id} is not deleted.`,
                });
            }

            return await ctx.db.comment.update({
                where: { id: input.id },
                data: {
                    deletedAt: null,
                    updatedById: userId,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Failed to restore comment with ID ${input.id}.`,
                cause: error,
            });
        }
    });

export {
    deleteComment,
    restoreComment
}