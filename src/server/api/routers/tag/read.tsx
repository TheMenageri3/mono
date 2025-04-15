import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const readTags = publicProcedure.query(async ({ ctx }) => {
  const tags = await ctx.db.tag.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return tags;
});
export const getTagById = publicProcedure
  .input(z.object({ tagname: z.string() }))
  .query(async ({ input, ctx }) => {
    const tag = await ctx.db.tag.findFirst({
      where: {
        tagname: input.tagname,
        deletedAt: null,
      },
    });

    return tag;
  });
export const readDeletedTags = publicProcedure.query(async ({ ctx }) => {
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
});
