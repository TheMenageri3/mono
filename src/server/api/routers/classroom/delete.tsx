import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteClassroom = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existingClassroom = await ctx.db.class.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existingClassroom.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Classroom already deleted",
        });
      }
      const classroom = await ctx.db.class.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
      return classroom;
    } catch (error) {
      console.error("Error deleting classroom by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete classroom",
        cause: error,
      });
    }
  });

export const restoreClassroom = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existingClassroom = await ctx.db.class.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (existingClassroom.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Classroom is not deleted",
        });
      }
      const classroom = await ctx.db.class.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
      return classroom;
    } catch (error) {
      console.error("Error restoring classroom by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore classroom",
        cause: error,
      });
    }
  });
