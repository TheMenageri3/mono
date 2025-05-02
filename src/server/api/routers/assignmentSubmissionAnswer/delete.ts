import { protectedProcedure } from "@/server/api/trpc";
import {
  deleteAssignmentSubmissionAnswerSchema,
  restoreAssignmentSubmissionAnswerSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const deleteAssignmentSubmissionAnswer = protectedProcedure
  .input(deleteAssignmentSubmissionAnswerSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existing = await ctx.db.assignmentSubmissionAnswer.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Answer already deleted.",
      });
    }

    try {
      return await ctx.db.assignmentSubmissionAnswer.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to soft delete answer.",
        cause: error,
      });
    }
  });

export const restoreAssignmentSubmissionAnswer = protectedProcedure
  .input(restoreAssignmentSubmissionAnswerSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existing = await ctx.db.assignmentSubmissionAnswer.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Answer is not deleted.",
      });
    }

    try {
      return await ctx.db.assignmentSubmissionAnswer.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore answer.",
        cause: error,
      });
    }
  });
