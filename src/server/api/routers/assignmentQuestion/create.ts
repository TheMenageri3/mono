import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

const createAssignmentQuestions = protectedProcedure
    .input(
        z.object({
            questionId: z.string(),
            assignmentId: z.string(),
            order: z.number(),
            required: z.boolean(),
            points: z.number().finite(),
            section: z.string().optional(),
        })
    )
    .mutation(async ({ ctx, input }) => {
        try {
        const userId = ctx.session.user.id;

        return await ctx.db.assignmentQuestion.create({
            data: {
                ...input,
                createdById: userId,
                updatedById: userId,
            },
        });
    } catch (error) {
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create assignment question!",
            cause: error,
          });
    }
    });

    export {
        createAssignmentQuestions
    }