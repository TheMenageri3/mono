import { protectedProcedure } from "@/server/api/trpc";
import { getAnswerByIdSchema, readAnswersSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const getAnswerById = protectedProcedure
  .input(getAnswerByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.assignmentSubmissionAnswer.findUniqueOrThrow({
        where: {
          id: input.id,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Answer with ID ${input.id} not found.`,
        cause: error,
      });
    }
  });

export const readAnswers = protectedProcedure
  .input(readAnswersSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.assignmentSubmissionAnswer.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: { updatedAt: "desc" },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Error reading assignment submission answers`,
        cause: error,
      });
    }
  });
