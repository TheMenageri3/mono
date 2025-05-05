import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  getAssignmentSubmissionByIdSchema,
  readAssignmentSubmissionsSchema,
} from "@/schemas";

export const getAssignmentSubmissionById = protectedProcedure
  .input(getAssignmentSubmissionByIdSchema)
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

export const readAssignmentSubmissions = protectedProcedure
  .input(readAssignmentSubmissionsSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.assignmentSubmission.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Error reading assignment submissions`,
        cause: error,
      });
    }
  });
