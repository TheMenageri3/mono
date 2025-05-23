import { protectedProcedure } from "@/server/api/trpc";
import { updateAssignmentSubmissionAnswerSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateAssignmentSubmissionAnswer = protectedProcedure
  .input(updateAssignmentSubmissionAnswerSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existing = await ctx.db.assignmentSubmissionAnswer.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Answer has been deleted.",
      });
    }

    try {
      return await ctx.db.assignmentSubmissionAnswer.update({
        where: { id: input.id },
        data: {
          ...input.data,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update answer.",
        cause: error,
      });
    }
  });
