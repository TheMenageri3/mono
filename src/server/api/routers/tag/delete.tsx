import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const deleteTag = protectedProcedure
  .input(
    z.object({
      tagname: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.db.tag.update({
      where: { tagname: input.tagname },
      data: {
        deletedAt: new Date(),
        updatedById: userId,
      },
    });
  });

export const restoreTag = protectedProcedure
  .input(z.object({ tagname: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const tag = await ctx.db.tag.update({
      where: { tagname: input.tagname },
      data: {
        deletedAt: null,
        updatedById: ctx.session.user.id,
      },
    });

    return tag;
  });
