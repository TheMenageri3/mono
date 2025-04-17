import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readJobPostingApplicationQuestions = protectedProcedure.query(async ({ ctx }) => {
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

export const getJobPostingApplicationQuestionById = protectedProcedure
  .input(z.object({ id: z.string() }))
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

export const readDeletedJobPostingApplicationQuestions = protectedProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.db.jobApplicationQuestion.findMany({
      where: { deletedAt: { not: null } },
      orderBy: { order: "asc" },
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch deleted job posting application questions",
      cause: error,
    });
  }
});

