import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readTags = publicProcedure.query(async ({ ctx }) => {
  try {
    const tags = await ctx.db.tag.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return tags;
  } catch (error) {
    console.error("Error reading tags:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read tags",
      cause: error,
    });
  }
});

export const getTagById = publicProcedure
  .input(z.object({ tagname: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      const tag = await ctx.db.tag.findFirst({
        where: {
          tagname: input.tagname,
          deletedAt: null,
        },
      });
      return tag;
    } catch (error) {
      console.error("Error getting tag by ID:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get tag",
        cause: error,
      });
    }
  });

export const readDeletedTags = publicProcedure.query(async ({ ctx }) => {
  try {
    const tags = await ctx.db.tag.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return tags;
  } catch (error) {
    console.error("Error reading deleted tags:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read deleted tags",
      cause: error,
    });
  }
});
