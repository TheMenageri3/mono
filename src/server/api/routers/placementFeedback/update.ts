import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updatePlacementFeedback = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      feedbackType: z.enum(["STUDENT", "EMPLOYER", "ADMIN"]).optional(),
      satisfactionLevel: z
        .enum([
          "VERY_SATISFIED",
          "SATISFIED",
          "NEUTRAL",
          "DISSATISFIED",
          "VERY_DISSATISFIED",
        ])
        .optional(),
      preparednessRating: z.number().min(1).max(5).optional(),
      skillsMatchRating: z.number().min(1).max(5).optional(),
      cultureFitRating: z.number().min(1).max(5).optional(),
      feedbackText: z.string().optional(),
      improvementSuggestions: z.string().optional(),
      followUpNeeded: z.boolean().optional(),
      respondentId: z.string().optional(),
      placementId: z.string().optional(),
    })
  )
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
