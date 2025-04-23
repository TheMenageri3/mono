import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const getAssignmentSubmissionById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.assignmentSubmission.findUniqueOrThrow({
        where: {
          id: input.id,
          deletedAt: null,
        },
        include: {
          answers: true,
          files: true,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Submission with ID ${input.id} not found.`,
        cause: error,
      });
    }
  });

export const readAssignmentSubmissions = protectedProcedure.query(async ({ ctx }) => {
  return await ctx.db.assignmentSubmission.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
});
