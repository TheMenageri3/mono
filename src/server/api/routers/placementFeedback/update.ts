import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updatePlacementFeedbackSchema } from "@/schemas";

export const updatePlacementFeedback = protectedProcedure
  .input(updatePlacementFeedbackSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingPlacementFeedback =
      await ctx.db.placementFeedback.findUniqueOrThrow({
        where: { id: input.id },
      });

    if (existingPlacementFeedback.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Placement feedback already deleted",
      });
    }

    try {
      const placementFeedback = await ctx.db.placementFeedback.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return placementFeedback;
    } catch (error) {
      console.error("Error updating placement feedback:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update placement feedback",
        cause: error,
      });
    }
  });
