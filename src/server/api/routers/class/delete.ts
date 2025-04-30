import { protectedProcedure } from "@/server/api/trpc";
import { deleteClassSchema, restoreClassSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const deleteClass = protectedProcedure
  .input(deleteClassSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existingClass = await ctx.db.class.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existingClass.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Class already deleted",
        });
      }
      const class_ = await ctx.db.class.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
      return class_;
    } catch (error) {
      console.error("Error deleting class by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete class",
        cause: error,
      });
    }
  });

export const restoreClass = protectedProcedure
  .input(restoreClassSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existingClass = await ctx.db.class.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (existingClass.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Class is not deleted",
        });
      }
      const class_ = await ctx.db.class.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
      return class_;
    } catch (error) {
      console.error("Error restoring class by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore class",
        cause: error,
      });
    }
  });
