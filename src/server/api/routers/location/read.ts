import { protectedProcedure } from "@/server/api/trpc";
import {
  readLocationsSchema,
  readDeletedLocationsSchema,
  getLocationByIdSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const readLocations = protectedProcedure
  .input(readLocationsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const locations = await ctx.db.location.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return locations;
    } catch (error) {
      console.error("Error reading locations:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read locations",
        cause: error,
      });
    }
  });

export const readDeletedLocations = protectedProcedure
  .input(readDeletedLocationsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const locations = await ctx.db.location.findMany({
        where: {
          deletedAt: { not: null },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return locations;
    } catch (error) {
      console.error("Error reading locations:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted locations",
        cause: error,
      });
    }
  });

export const getLocationById = protectedProcedure
  .input(getLocationByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const location = await ctx.db.location.findUnique({
        where: {
          id: input.id,
          deletedAt: null,
        },
      });
      return location;
    } catch (error) {
      console.error("Error getting location by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get location",
        cause: error,
      });
    }
  });
