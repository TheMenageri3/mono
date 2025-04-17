import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readPlacementFeedback = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      const placementFeedbacks = await ctx.db.placementFeedback.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return placementFeedbacks;
    } catch (error) {
      console.error("Error reading placement feedbacks:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read placement feedbacks",
        cause: error,
      });
    }
  }
);

export const readDeletedPlacementFeedbacks = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      const placementFeedbacks = await ctx.db.placementFeedback.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return placementFeedbacks;
    } catch (error) {
      console.error("Error reading deleted placement feedbacks:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted placement feedbacks",
        cause: error,
      });
    }
  }
);

export const getPlacementFeedbackById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      const placementFeedback = await ctx.db.placementFeedback.findUnique({
        where: {
          id: input.id,
        },
      });
      return placementFeedback;
    } catch (error) {
      console.error("Error getting placement feedback by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get placement feedback",
        cause: error,
      });
    }
  });

export const getPlacementFeedbackByData = protectedProcedure
  .input(
    z.object({
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
  .query(async ({ ctx, input }) => {
    try {
      const placementFeedback = await ctx.db.placementFeedback.findMany({
        where: {
          ...input,
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return placementFeedback;
    } catch (error) {
      console.error("Error getting placement feedback by data:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get placement feedbacks",
        cause: error,
      });
    }
  });
