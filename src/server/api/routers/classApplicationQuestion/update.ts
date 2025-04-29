import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const updateClassApplicationQuestion = protectedProcedure
    .input(
        z.object({
            id: z.string(),
            data: z.object({
                order: z.number().int().optional(),
                required: z.boolean().optional(),
                points: z.number().finite().optional(),
                section: z.string().nullable().optional(),
                questionId: z.string().optional(),
            }),
        }),
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        let classApplicationQuestion;
        try {
            classApplicationQuestion = await ctx.db.classApplicationQuestion
                .findUniqueOrThrow({
                    where: { id: input.id },
                });

            if (classApplicationQuestion.deletedAt !== null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message:
                        `Class Application Question with ID ${input.id} has been deleted.`,
                });
            }

            return await ctx.db.classApplicationQuestion.update({
                where: { id: input.id },
                data: {
                    ...input.data,
                    updatedById: userId,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message:
                    `Failed to update class application question with ID ${input.id}.`,
                cause: error,
            });
        }
    });

export { updateClassApplicationQuestion };
