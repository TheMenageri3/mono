import { protectedProcedure } from "@/server/api/trpc";
import { createAssignmentSubmissionAnswerSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createAssignmentSubmissionAnswer = protectedProcedure
  .input(createAssignmentSubmissionAnswerSchema)
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
