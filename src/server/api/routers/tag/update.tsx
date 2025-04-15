import { z } from "zod";
import { protectedProcedure } from "@/server/api/trpc";

export const updateTag = protectedProcedure
  .input(
    z.object({
      tagname: z.string(),
      color: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.db.tag.update({
      where: { tagname: input.tagname },
      data: {
        color: input.color,
        updatedById: userId,
      },
    });
  });
