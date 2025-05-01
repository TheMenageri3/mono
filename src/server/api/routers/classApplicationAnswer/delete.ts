import { protectedProcedure } from "@/server/api/trpc";
import {
  deleteClassApplicationAnswerSchema,
  restoreClassApplicationAnswerSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const deleteClassApplicationAnswer = protectedProcedure
  .input(deleteClassApplicationAnswerSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const existingClassApplicationAnswer =
        await ctx.db.classApplicationAnswer.findUniqueOrThrow({
          where: { id: input.id },
        });
      if (existingClassApplicationAnswer.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class application answer already deleted",
        });
      }
      return await ctx.db.classApplicationAnswer.update({
        where: { id: input.id },
        data: { deletedAt: new Date(), updatedById: userId },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete class application answer",
      });
    }
  });

export const restoreClassApplicationAnswer = protectedProcedure
  .input(restoreClassApplicationAnswerSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const existingClassApplicationAnswer =
        await ctx.db.classApplicationAnswer.findUniqueOrThrow({
          where: { id: input.id },
        });
      if (existingClassApplicationAnswer.deletedAt === null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class application answer not deleted",
        });
      }
      return await ctx.db.classApplicationAnswer.update({
        where: { id: input.id },
        data: { deletedAt: null, updatedById: userId },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore class application answer",
      });
    }
  });
