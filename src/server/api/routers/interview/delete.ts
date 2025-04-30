import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { deleteInterviewSchema, restoreInterviewSchema } from "@/schemas";

export const deleteInterview = protectedProcedure
  .input(deleteInterviewSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existingInterview = await ctx.db.interview.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existingInterview.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Interview already deleted",
        });
      }
      const interview = await ctx.db.interview.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
      return interview;
    } catch (error) {
      console.error("Error deleting interview by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete interview",
        cause: error,
      });
    }
  });

export const restoreInterview = protectedProcedure
  .input(restoreInterviewSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existingInterview = await ctx.db.interview.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (existingInterview.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Interview is not deleted",
        });
      }
      const interview = await ctx.db.interview.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
      return interview;
    } catch (error) {
      console.error("Error restoring interview by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore interview",
        cause: error,
      });
    }
  });
