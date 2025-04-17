import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createPlacementFeedback = protectedProcedure
  .input(
    z.object({
      feedbackType: z.enum(["STUDENT", "EMPLOYER", "ADMIN"]),
      satisfactionLevel: z.enum([
        "VERY_SATISFIED",
        "SATISFIED",
        "NEUTRAL",
        "DISSATISFIED",
        "VERY_DISSATISFIED",
      ]),
      preparednessRating: z.number().min(1).max(5),
      skillsMatchRating: z.number().min(1).max(5),
      cultureFitRating: z.number().min(1).max(5),
      feedbackText: z.string(),
      improvementSuggestions: z.string().optional(),
      followUpNeeded: z.boolean(),
      respondentId: z.string(),
      placementId: z.string(),
    })
  )
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
