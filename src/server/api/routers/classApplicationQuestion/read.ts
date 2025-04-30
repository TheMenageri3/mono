import { protectedProcedure } from "@/server/api/trpc";
import {
  getClassApplicationQuestionByIdSchema,
  getClassApplicationQuestionsByClassApplicationIdSchema,
  getDeletedClassApplicationQuestionsSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const getClassApplicationQuestionById = protectedProcedure
  .input(getClassApplicationQuestionByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const question = await ctx.db.classApplicationQuestion.findUniqueOrThrow({
        where: { id: input.id, deletedAt: null },
      });
      return question;
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Class application question not found or was deleted",
        cause: error,
      });
    }
  });

export const getClassApplicationQuestionsByClassApplicationId =
  protectedProcedure
    .input(getClassApplicationQuestionsByClassApplicationIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.classApplicationQuestion.findMany({
          where: {
            classApplicationId: input.classApplicationId,
            deletedAt: null,
          },
          take: input.limit,
          skip: input.offset,
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class application questions not found",
          cause: error,
        });
      }
    });

export const getDeletedClassApplicationQuestions = protectedProcedure
  .input(getDeletedClassApplicationQuestionsSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.classApplicationQuestion.findMany({
        where: { deletedAt: { not: null } },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Deleted class application questions not found",
        cause: error,
      });
    }
  });
