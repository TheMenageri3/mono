import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateAssignmentSubmissionSchema } from "@/schemas";

export const updateAssignmentSubmission = protectedProcedure
  .input(updateAssignmentSubmissionSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existing = await ctx.db.assignmentSubmission.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Submission has been deleted.",
      });
    }

    try {
      return await ctx.db.assignmentSubmission.update({
        where: { id: input.id },
        data: {
          ...input.data,
          gradedAt: input.data.gradedAt
            ? new Date(input.data.gradedAt)
            : undefined,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update submission.",
        cause: error,
      });
    }
  });
