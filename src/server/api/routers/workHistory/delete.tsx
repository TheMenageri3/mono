import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";


export const deleteWorkHistory = protectedProcedure
  .input(
    z.object({
      id: z.string(), 
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingWorkHistory = await ctx.db.workHistory.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existingWorkHistory.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Work History not found",
      });
    }

    try {
      const workHistory = await ctx.db.workHistory.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: new Date(), 
          updatedById: userId,
        },
      });
      return workHistory;
    } catch (error) {
      console.error("Error deleting work history:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete work history",
        cause: error,
      });
    }
  });


export const restoreWorkHistory = protectedProcedure
  .input(
    z.object({
      id: z.string(), 
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingWorkHistory = await ctx.db.workHistory.findUnique({
      where: { id: input.id },
    });

    if (!existingWorkHistory) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Work History not found",
      });
    }

    if (existingWorkHistory.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Work History is not deleted",
      });
    }

    try {
      const workHistory = await ctx.db.workHistory.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: null, 
          updatedById: userId,
        },
      });
      return workHistory;
    } catch (error) {
      console.error("Error restoring work history:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore work history",
        cause: error,
      });
    }
  });
