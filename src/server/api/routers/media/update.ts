import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateMediaSchema } from "@/schemas";

export const updateMedia = protectedProcedure
  .input(updateMediaSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.media.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Media already deleted",
      });
    }

    try {
      const media = await ctx.db.media.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });

      return media;
    } catch (error) {
      console.error("Error updating media:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update media",
        cause: error,
      });
    }
  });
