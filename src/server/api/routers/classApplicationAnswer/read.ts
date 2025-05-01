import { protectedProcedure } from "@/server/api/trpc";
import {
  getClassApplicationAnswerByIdSchema,
  getClassApplicationAnswerByQuestionIdSchema,
  getClassApplicationAnswersByClassApplicationQuestionIdSchema,
  getClassApplicationAnswersByClassApplicationResponseIdSchema,
  getDeletedClassApplicationAnswersSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const getClassApplicationAnswerById = protectedProcedure
  .input(getClassApplicationAnswerByIdSchema)
  .query(async ({ ctx, input }) => {
    const existingClassApplicationAnswer =
      await ctx.db.classApplicationAnswer.findUniqueOrThrow({
        where: { id: input.id },
      });
    if (existingClassApplicationAnswer.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Class application answer was deleted",
      });
    }

    try {
      return await ctx.db.classApplicationAnswer.findUniqueOrThrow({
        where: { id: input.id, deletedAt: null },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Class application answer not found",
      });
    }
  });

export const getClassApplicationAnswerByQuestionId = protectedProcedure
  .input(getClassApplicationAnswerByQuestionIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.classApplicationAnswer.findMany({
        where: { questionId: input.questionId, deletedAt: null },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Class application answer not found",
      });
    }
  });

export const getClassApplicationAnswersByClassApplicationQuestionId =
  protectedProcedure
    .input(getClassApplicationAnswersByClassApplicationQuestionIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.classApplicationAnswer.findMany({
          where: {
            classApplicationQuestionId: input.classApplicationQuestionId,
            deletedAt: null,
          },
          take: input.limit,
          skip: input.offset,
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class application answers not found",
        });
      }
    });

export const getClassApplicationAnswersByClassApplicationResponseId =
  protectedProcedure
    .input(getClassApplicationAnswersByClassApplicationResponseIdSchema)
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.classApplicationAnswer.findMany({
          where: {
            classApplicationResponseId: input.classApplicationResponseId,
            deletedAt: null,
          },
          take: input.limit,
          skip: input.offset,
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class application answers not found",
        });
      }
    });

export const getDeletedClassApplicationAnswers = protectedProcedure
  .input(getDeletedClassApplicationAnswersSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.classApplicationAnswer.findMany({
        where: { deletedAt: { not: null } },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Deleted Class application answers not found",
      });
    }
  });
