import { protectedProcedure } from "@/server/api/trpc";
import {
  deleteClassApplicationSchema,
  restoreClassApplicationSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const deleteClassApplication = protectedProcedure
  .input(deleteClassApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existingClassApplication =
      await ctx.db.classApplication.findUniqueOrThrow({
        where: { id: input.id },
      });

    if (existingClassApplication.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Class Application already deleted",
      });
    }
    try {
      const classApplication = await ctx.db.classApplication.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
      return classApplication;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete class application",
        cause: error,
      });
    }
  });

export const restoreClassApplication = protectedProcedure
  .input(restoreClassApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existingClassApplication =
      await ctx.db.classApplication.findUniqueOrThrow({
        where: { id: input.id },
      });

    if (existingClassApplication.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Class Application is not deleted",
      });
    }

    try {
      const classApplication = await ctx.db.classApplication.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
      return classApplication;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore class application",
        cause: error,
      });
    }
  });
