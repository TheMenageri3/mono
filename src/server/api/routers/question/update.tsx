import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { QuestionType } from "@/generated/prisma";

const updateQuestion = protectedProcedure
    .input(
        z.object({
            id: z.string(),
            data: z.object({
                text: z.string().optional(),
                description: z.string().optional(),
                type: z.nativeEnum(QuestionType).optional(),
                required: z.boolean().optional(),
                order: z.number().optional(),
                metadata: z.object({}).optional(),
            }),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        let question;
        try {
            question = await ctx.db.question.findUniqueOrThrow({
                where: { id: input.id },
            });

            if (question.deletedAt !== null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `Question with ID ${input.id} has been deleted.`,
                });
            }

            return await ctx.db.question.update({
                where: { id: input.id },
                data: {
                    ...input.data,
                    updatedById: userId,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Failed to update question with ID ${input.id}.`,
                cause: error,
            });
        }
    });

export { updateQuestion };