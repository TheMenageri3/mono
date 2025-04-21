import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { QuestionType } from "@/generated/prisma";

const createQuestion = protectedProcedure
    .input(
        z.object({
            text: z.string(),
            description: z.string().optional(),
            type: z.nativeEnum(QuestionType),
            required: z.boolean(),
            order: z.number().optional(),
            metadata: z.object({}).optional(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        try {
            const userId = ctx.session.user.id;
            const question = await ctx.db.question.create({
                data: {
                    ...input,
                    createdById: userId,
                    updatedById: userId,
                },
            });
            return question;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create question",
                cause: error,
            });
        }
    });

export {
    createQuestion
}