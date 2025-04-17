import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readMedia = protectedProcedure.query(async ({ ctx }) => {
  try {
    const media = await ctx.db.media.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
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

export const readDeletedMedias = protectedProcedure.query(async ({ ctx }) => {
  try {
    const medias = await ctx.db.media.findMany({
      where: {
        deletedAt: { not: null },
      },
      orderBy: {
        updatedAt: "desc",
      },
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
  .input(z.object({ id: z.string() }))
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
