import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  readTagsSchema,
  getTagByNameSchema,
  readDeletedTagsSchema,
} from "@/schemas";

export const readTags = publicProcedure
  .input(readTagsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const tags = await ctx.db.tag.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
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

export const getTagByName = publicProcedure
  .input(getTagByNameSchema)
  .query(async ({ input, ctx }) => {
    try {
      const tag = await ctx.db.tag.findFirst({
        where: {
          tagName: input.tagName,
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

export const readDeletedTags = publicProcedure
  .input(readDeletedTagsSchema)
  .query(async ({ ctx, input }) => {
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
        take: input.limit,
        skip: input.offset,
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
