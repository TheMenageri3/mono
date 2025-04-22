import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

const updateAnswer = protectedProcedure
    .input(
        z.object({
            id: z.string(),
            data: z.object({
                value: z.object({}).optional(),
            }),
        })
    )
    .mutation(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        let answer;
        try {
            answer = await ctx.db.answer.findUniqueOrThrow({
                where: { id: input.id },
            });

            if (answer.deletedAt !== null) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: `Answer with ID ${input.id} has been deleted.`,
                });
            }

            return await ctx.db.answer.update({
                where: { id: input.id },
                data: {
                    ...input.data,
                    updatedById: userId,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Failed to update answer with ID ${input.id}.`,
                cause: error,
            });
        }
    });

export {
    updateAnswer
}