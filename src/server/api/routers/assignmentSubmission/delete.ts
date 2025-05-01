import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  deleteAssignmentSubmissionSchema,
  restoreAssignmentSubmissionSchema,
} from "@/schemas";

export const deleteAssignmentSubmission = protectedProcedure
  .input(deleteAssignmentSubmissionSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existing = await ctx.db.assignmentSubmission.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Submission already deleted.",
      });
    }

    try {
      return await ctx.db.assignmentSubmission.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to soft delete submission.",
        cause: error,
      });
    }
  });

export const restoreAssignmentSubmission = protectedProcedure
  .input(restoreAssignmentSubmissionSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existing = await ctx.db.assignmentSubmission.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Submission is not deleted.",
      });
    }

    try {
      return await ctx.db.assignmentSubmission.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore submission.",
        cause: error,
      });
    }
  });
