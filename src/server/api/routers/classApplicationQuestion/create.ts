import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const createClassApplicationQuestion = protectedProcedure
    .input(
        z.object({
            order: z.number(),
            required: z.boolean(),
            points: z.number(),
            section: z.string().nullable().optional(),
            classApplicationId: z.string(),
            questionId: z.string(),
        }),
    )
    .mutation(async ({ ctx, input }) => {
        try {
            const userId = ctx.session.user.id;
            return await ctx.db.classApplicationQuestion.create({
                data: {
                    ...input,
                    createdById: userId,
                    updatedById: userId,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create class application question",
                cause: error,
            });
        }
    });

export { createClassApplicationQuestion };
