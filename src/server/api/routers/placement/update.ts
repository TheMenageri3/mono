import { protectedProcedure } from "@/server/api/trpc";
import { updatePlacementSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updatePlacement = protectedProcedure
  .input(updatePlacementSchema)
  .mutation(async ({ input, ctx }) => {
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

    try {
      const placement = await ctx.db.placement.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return placement;
    } catch (error) {
      console.error("Error updating placement:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update placement",
        cause: error,
      });
    }
  });
