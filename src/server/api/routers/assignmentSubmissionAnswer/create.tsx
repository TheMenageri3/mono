import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createAssignmentSubmissionAnswer = protectedProcedure
  .input(
    z.object({
      assignmentSubmissionId: z.string(),
      questionId: z.string(),
      assignmentQuestionId: z.string(),
      answerId: z.string().optional(),
      value: z.object({}),
      feedback: z.string().optional(),
      pointsAwarded: z.number().optional(),
      submitterId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      return await ctx.db.assignmentSubmissionAnswer.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create answer.",
        cause: error,
      });
    }
  });
