import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  readPlacementsSchema,
  readDeletedPlacementsSchema,
  getPlacementByIdSchema,
  getPlacementByDataSchema,
} from "@/schemas";

export const readPlacements = protectedProcedure
  .input(readPlacementsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const placements = await ctx.db.placement.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return placements;
    } catch (error) {
      console.error("Error reading placements:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read placements",
        cause: error,
      });
    }
  });

export const readDeletedPlacements = protectedProcedure
  .input(readDeletedPlacementsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const placements = await ctx.db.placement.findMany({
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
      return placements;
    } catch (error) {
      console.error("Error reading deleted placements:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted placements",
        cause: error,
      });
    }
  });

export const getPlacementById = protectedProcedure
  .input(getPlacementByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const placement = await ctx.db.placement.findUnique({
        where: {
          id: input.id,
        },
      });
      return placement;
    } catch (error) {
      console.error("Error getting placement by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get placement",
        cause: error,
      });
    }
  });

export const getPlacementByData = protectedProcedure
  .input(getPlacementByDataSchema)
  .query(async ({ ctx, input }) => {
    try {
      const placement = await ctx.db.placement.findMany({
        where: {
          ...input,
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return placement;
    } catch (error) {
      console.error("Error getting placement by data:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get placement",
        cause: error,
      });
    }
  });
