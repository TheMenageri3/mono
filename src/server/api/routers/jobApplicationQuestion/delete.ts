import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  deleteJobApplicationQuestionSchema,
  restoreJobApplicationQuestionSchema,
} from "@/schemas";

export const deleteJobApplicationQuestion = protectedProcedure
  .input(deleteJobApplicationQuestionSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.jobApplicationQuestion.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existing.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Record already deleted",
        });
      }

      return await ctx.db.jobApplicationQuestion.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete job posting application question",
        cause: error,
      });
    }
  });

export const restoreJobApplicationQuestion = protectedProcedure
  .input(restoreJobApplicationQuestionSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.jobApplicationQuestion.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existing.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Record is not deleted",
        });
      }

      return await ctx.db.jobApplicationQuestion.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore job posting application question",
        cause: error,
      });
    }
  });
