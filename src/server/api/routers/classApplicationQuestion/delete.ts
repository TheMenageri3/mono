import { protectedProcedure } from "@/server/api/trpc";
import {
  deleteClassApplicationQuestionSchema,
  restoreClassApplicationQuestionSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const deleteClassApplicationQuestion = protectedProcedure
  .input(deleteClassApplicationQuestionSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const existing = await ctx.db.classApplicationQuestion.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (existing.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class application question already deleted",
        });
      }
      return await ctx.db.classApplicationQuestion.update({
        where: { id: input.id },
        data: { deletedAt: new Date(), updatedById: userId },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete class application question",
        cause: error,
      });
    }
  });

export const restoreClassApplicationQuestion = protectedProcedure
  .input(restoreClassApplicationQuestionSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const existing = await ctx.db.classApplicationQuestion.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (existing.deletedAt === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class application question not deleted",
        });
      }
      return await ctx.db.classApplicationQuestion.update({
        where: { id: input.id },
        data: { deletedAt: null, updatedById: userId },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore class application question",
        cause: error,
      });
    }
  });
