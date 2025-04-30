import { publicProcedure } from "@/server/api/trpc";
import {
  readVenueContactInfoByIdSchema,
  readVenueContactInfosSchema,
  readDeletedVenueContactInfosSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const readVenueContactInfoById = publicProcedure
  .input(readVenueContactInfoByIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.venueContactInfo.findUnique({
        where: {
          id: input.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read venue contact info",
        cause: error,
      });
    }
  });

export const readVenueContactInfos = publicProcedure
  .input(readVenueContactInfosSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.venueContactInfo.findMany({
        where: {
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read venue contact infos",
        cause: error,
      });
    }
  });

export const readDeletedVenueContactInfos = publicProcedure
  .input(readDeletedVenueContactInfosSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.venueContactInfo.findMany({
        where: {
          deletedAt: { not: null },
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted venue contact infos",
        cause: error,
      });
    }
  });
