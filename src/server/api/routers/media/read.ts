import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  readMediasSchema,
  readDeletedMediasSchema,
  getMediaByIdSchema,
} from "@/schemas";

export const readMedias = protectedProcedure
  .input(readMediasSchema)
  .query(async ({ ctx, input }) => {
    try {
      const media = await ctx.db.media.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return media;
    } catch (error) {
      console.error("Error reading medias:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read medias",
        cause: error,
      });
    }
  });

export const readDeletedMedias = protectedProcedure
  .input(readDeletedMediasSchema)
  .query(async ({ ctx, input }) => {
    try {
      const medias = await ctx.db.media.findMany({
        where: {
          deletedAt: { not: null },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return medias;
    } catch (error) {
      console.error("Error reading media:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted medias",
        cause: error,
      });
    }
  });

export const getMediaById = protectedProcedure
  .input(getMediaByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const media = await ctx.db.media.findUnique({
        where: {
          id: input.id,
          deletedAt: null,
        },
      });
      return media;
    } catch (error) {
      console.error("Error getting media by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get media",
        cause: error,
      });
    }
  });
