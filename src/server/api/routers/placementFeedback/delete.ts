import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  deletePlacementFeedbackSchema,
  restorePlacementFeedbackSchema,
} from "@/schemas";

export const deletePlacementFeedback = protectedProcedure
  .input(deletePlacementFeedbackSchema)
  .mutation(async ({ ctx, input }) => {
    try {
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
      const placementFeedback = await ctx.db.placementFeedback.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
      return placementFeedback;
    } catch (error) {
      console.error("Error deleting placement feedback by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete placement feedback",
        cause: error,
      });
    }
  });

export const restorePlacementFeedback = protectedProcedure
  .input(restorePlacementFeedbackSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existingPlacementFeedback =
        await ctx.db.placementFeedback.findUniqueOrThrow({
          where: { id: input.id },
        });
      if (existingPlacementFeedback.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Placement feedback is not deleted",
        });
      }
      const placementFeedback = await ctx.db.placementFeedback.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
      return placementFeedback;
    } catch (error) {
      console.error("Error restoring placement feedback by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore placement feedback",
        cause: error,
      });
    }
  });
