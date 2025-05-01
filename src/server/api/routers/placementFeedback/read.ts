import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  readPlacementFeedbackSchema,
  readDeletedPlacementFeedbacksSchema,
  readPlacementFeedbackByIdSchema,
  getPlacementFeedbackByDataSchema,
} from "@/schemas";

export const readPlacementFeedback = protectedProcedure
  .input(readPlacementFeedbackSchema)
  .query(async ({ ctx, input }) => {
    try {
      const placementFeedbacks = await ctx.db.placementFeedback.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
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
  });

export const readDeletedPlacementFeedbacks = protectedProcedure
  .input(readDeletedPlacementFeedbacksSchema)
  .query(async ({ ctx, input }) => {
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
        take: input.limit,
        skip: input.offset,
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
  });

export const getPlacementFeedbackById = protectedProcedure
  .input(readPlacementFeedbackByIdSchema)
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
  .input(getPlacementFeedbackByDataSchema)
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
        take: input.limit,
        skip: input.offset,
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
