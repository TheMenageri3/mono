import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

const deleteQuestion = protectedProcedure
    .input(
        z.object({ id: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;

        try {
            const question = await ctx.db.question.findUniqueOrThrow({
                where: { id: input.id },
            });

            if (question.deletedAt !== null) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `Question with ID ${input.id} is already deleted.`,
                });
            }

            return await ctx.db.question.update({
                where: { id: input.id },
                data: {
                    deletedAt: new Date(),
                    updatedById: userId,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Failed to delete question with ID ${input.id}.`,
                cause: error,
            });
        }
    });

const restoreQuestion = protectedProcedure
    .input(
        z.object({ id: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;

        try {
            const question = await ctx.db.question.findUniqueOrThrow({
                where: { id: input.id },
            });

            if (question.deletedAt === null) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `Question with ID ${input.id} is not deleted.`,
                });
            }

            return await ctx.db.question.update({
                where: { id: input.id },
                data: {
                    deletedAt: null,
                    updatedById: userId,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Failed to restore question with ID ${input.id}.`,
                cause: error,
            });
        }
    });

export {
    deleteQuestion,
    restoreQuestion,
};