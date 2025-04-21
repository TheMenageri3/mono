import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

const createAnswer = protectedProcedure
    .input(
        z.object({
            value: z.object({}).optional(),
            questionId: z.string(),
            answererId: z.string(),
            assignmentId: z.string().optional(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        try {
            const userId = ctx.session.user.id;
            const answer = await ctx.db.answer.create({
                data: {
                    ...input,
                    createdById: userId,
                    updatedById: userId,
                },
            });
            return answer;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create answer",
                cause: error,
            });
        }
    });

export {
    createAnswer
}