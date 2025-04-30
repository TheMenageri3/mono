import { protectedProcedure } from "@/server/api/trpc";
import { deletePlacementSchema, restorePlacementSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const deletePlacement = protectedProcedure
  .input(deletePlacementSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existingPlacement = await ctx.db.placement.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existingPlacement.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Placement already deleted",
        });
      }
      const placement = await ctx.db.placement.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
      return placement;
    } catch (error) {
      console.error("Error deleting placement by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete placement",
        cause: error,
      });
    }
  });

export const restorePlacement = protectedProcedure
  .input(restorePlacementSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existingPlacement = await ctx.db.placement.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (existingPlacement.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Placement is not deleted",
        });
      }
      const placement = await ctx.db.placement.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
      return placement;
    } catch (error) {
      console.error("Error restoring placement by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore placement",
        cause: error,
      });
    }
  });
