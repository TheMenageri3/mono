import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateTag = protectedProcedure
  .input(
    z.object({
      tagname: z.string(),
      color: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingTag = await ctx.db.tag.findUniqueOrThrow({
      where: { tagname: input.tagname },
    });
    if (existingTag.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tag already deleted",
      });
    }
    try {
      const tag = await ctx.db.tag.update({
        where: { tagname: input.tagname },
        data: {
          color: input.color,
          updatedById: userId,
        },
      });
      return tag;
    } catch (error) {
      console.error("Error updating tag:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update tag",
        cause: error,
      });
    }
  });
