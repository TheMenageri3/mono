import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const getClassApplicationAnswerById = protectedProcedure
  .input(z.object({ id: z.string() }))
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
 .input(z.object({ questionId: z.string(),
    limit: z.number().optional(),
    offset: z.number().optional(),
  }))
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
    .input(z.object({ classApplicationQuestionId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.classApplicationAnswer.findMany({
          where: {
            classApplicationQuestionId: input.classApplicationQuestionId,
            deletedAt: null,
          },
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
    .input(z.object({ classApplicationResponseId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.db.classApplicationAnswer.findMany({
          where: {
            classApplicationResponseId: input.classApplicationResponseId,
            deletedAt: null,
          },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class application answers not found",
        });
      }
    });

    export const getDeletedClassApplicationAnswers = protectedProcedure
    .input(z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
      })
    )
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