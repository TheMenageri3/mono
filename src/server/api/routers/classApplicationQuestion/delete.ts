import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const deleteClassApplicationQuestion = protectedProcedure
    .input(
        z.object({ id: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;

        try {
            const classApplicationQuestion = await ctx.db
                .classApplicationQuestion
                .findUniqueOrThrow({
                    where: { id: input.id },
                });

            if (classApplicationQuestion.deletedAt !== null) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message:
                        `Class Application Question with ID ${input.id} is already deleted.`,
                });
            }

            return await ctx.db.classApplicationQuestion.update({
                where: { id: input.id },
                data: {
                    deletedAt: new Date(),
                    updatedById: userId,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message:
                    `Failed to delete class application question with ID ${input.id}.`,
                cause: error,
            });
        }
    });

const restoreClassApplicationQuestion = protectedProcedure
    .input(
        z.object({ id: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;

        try {
            const classApplicationQuestion = await ctx.db
                .classApplicationQuestion
                .findUniqueOrThrow({
                    where: { id: input.id },
                });

            if (classApplicationQuestion.deletedAt === null) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message:
                        `Class Application Question with ID ${input.id} is not deleted.`,
                });
            }

            return await ctx.db.classApplicationQuestion.update({
                where: { id: input.id },
                data: {
                    deletedAt: null,
                    updatedById: userId,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message:
                    `Failed to restore class application question with ID ${input.id}.`,
                cause: error,
            });
        }
    });

export { deleteClassApplicationQuestion, restoreClassApplicationQuestion };
