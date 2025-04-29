import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createAssignmentSubmissionSchema } from "@/schemas";

export const createAssignmentSubmission = protectedProcedure
  .input(createAssignmentSubmissionSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      return await ctx.db.assignmentSubmission.create({
        data: {
          ...input,
          submittedAt: input.submittedAt
            ? new Date(input.submittedAt)
            : undefined,
          gradedAt: input.gradedAt ? new Date(input.gradedAt) : undefined,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create assignment submission.",
        cause: error,
      });
    }
  });
