import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createPlacementFeedbackSchema } from "@/schemas";

export const createPlacementFeedback = protectedProcedure
  .input(createPlacementFeedbackSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const placementFeedback = await ctx.db.placementFeedback.create({
        data: {
          feedbackType: input.feedbackType,
          satisfactionLevel: input.satisfactionLevel,
          preparednessRating: input.preparednessRating,
          skillsMatchRating: input.skillsMatchRating,
          cultureFitRating: input.cultureFitRating,
          feedbackText: input.feedbackText,
          improvementSuggestions: input.improvementSuggestions || null,
          followUpNeeded: input.followUpNeeded,
          respondentId: input.respondentId,
          placementId: input.placementId,
          createdById: userId,
          updatedById: userId,
        },
      });
      return placementFeedback;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create placement feedback",
        cause: error,
      });
    }
  });
