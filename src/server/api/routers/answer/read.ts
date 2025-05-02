import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import {
  readAllAnswersSchema,
  readAnswerByIdSchema,
  readDeletedAnswersSchema,
} from "@/schemas";

// 01. Get answer by ID : NON-DELETED
const readAnswerById = protectedProcedure
  .input(readAnswerByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.answer.findUniqueOrThrow({
        where: {
          id: input.id,
          deletedAt: null,
        },
        include: {
          question: true,
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

// 02. Get all ACTIVE answers : NON-DELETED
const readAllAnswers = protectedProcedure
  .input(readAllAnswersSchema)
  .query(async ({ ctx, input }) => {
    return await ctx.db.answer.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: { updatedAt: "desc" },
      take: input.limit,
      skip: input.offset,
    });
  });

// 03. Get all DELETED answers
const readDeletedAnswers = protectedProcedure
  .input(readDeletedAnswersSchema)
  .query(async ({ ctx, input }) => {
    try {
      const answers = await ctx.db.answer.findMany({
        where: {
          deletedAt: { not: null },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return answers;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch deleted answers",
        cause: error,
      });
    }
  });

export { readAnswerById, readAllAnswers, readDeletedAnswers };
