import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const createTag = protectedProcedure
  .input(
    z.object({
      tagname: z.string(),
      color: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { tagname, color } = input;
    const userId = ctx.session.user.id;

    const tag = await ctx.db.tag.create({
      data: {
        tagname,
        color,
        createdById: userId,
        updatedById: userId,
      },
    });

    return tag;
  });
