import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteTag = protectedProcedure
  .input(
    z.object({
      tagName: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingTag = await ctx.db.tag.findUniqueOrThrow({
      where: { tagName: input.tagName },
    });
    if (existingTag.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tag already deleted",
      });
    }
    try {
      const tag = await ctx.db.tag.update({
        where: { tagName: input.tagName },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
      return tag;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete tag",
        cause: error,
      });
    }
  });

export const restoreTag = protectedProcedure
  .input(z.object({ tagName: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingTag = await ctx.db.tag.findUniqueOrThrow({
      where: { tagName: input.tagName },
    });
    if (existingTag.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Tag is not deleted",
      });
    }
    try {
      const tag = await ctx.db.tag.update({
        where: { tagName: input.tagName },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });

      return tag;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore tag",
        cause: error,
      });
    }
  });
