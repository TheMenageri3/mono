import { protectedProcedure } from "@/server/api/trpc";
import {
  readJobApplicationQuestionsSchema,
  getJobApplicationQuestionByIdSchema,
  readDeletedJobApplicationQuestionsSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const readJobApplicationQuestions = protectedProcedure
  .input(readJobApplicationQuestionsSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.jobApplicationQuestion.findMany({
        where: { deletedAt: null },
        orderBy: { order: "asc" },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read job posting application questions",
        cause: error,
      });
    }
  });

export const getJobApplicationQuestionById = protectedProcedure
  .input(getJobApplicationQuestionByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const record = await ctx.db.jobApplicationQuestion.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (record.deletedAt !== null) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Record not found" });
      }

      return record;
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Job posting application question not found",
        cause: error,
      });
    }
  });

export const readDeletedJobApplicationQuestions = protectedProcedure
  .input(readDeletedJobApplicationQuestionsSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.jobApplicationQuestion.findMany({
        where: { deletedAt: { not: null } },
        orderBy: { order: "asc" },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch deleted job posting application questions",
        cause: error,
      });
    }
  });
