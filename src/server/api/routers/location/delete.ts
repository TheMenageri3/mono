import { protectedProcedure } from "@/server/api/trpc";
import { deleteLocationSchema, restoreLocationSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const deleteLocation = protectedProcedure
  .input(deleteLocationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.location.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Location already deleted",
      });
    }

    try {
      const location = await ctx.db.location.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });

      return location;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete location",
        cause: error,
      });
    }
  });

export const restoreLocation = protectedProcedure
  .input(restoreLocationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.location.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Location is not deleted",
      });
    }

    try {
      const location = await ctx.db.location.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
      return location;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore location",
        cause: error,
      });
    }
  });
