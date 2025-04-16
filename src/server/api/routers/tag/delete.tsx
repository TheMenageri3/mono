import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteTag = protectedProcedure
  .input(
    z.object({
      tagname: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingTag = await ctx.db.tag.findUnique({
      where: { tagname: input.tagname },
    });
    if (!existingTag || existingTag.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tag not found",
      });
    }
    try {
      const tag = await ctx.db.tag.update({
        where: { tagname: input.tagname },
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
      });
    }
  });

export const restoreTag = protectedProcedure
  .input(z.object({ tagname: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingTag = await ctx.db.tag.findUnique({
      where: { tagname: input.tagname },
    });
    if (!existingTag) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Tag not found",
      });
    }
    if (existingTag.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Tag is not deleted",
      });
    }
    try {
      const tag = await ctx.db.tag.update({
        where: { tagname: input.tagname },
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
      });
    }
  });
