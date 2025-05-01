import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createMediaSchema } from "@/schemas";

export const createMedia = protectedProcedure
  .input(createMediaSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const media = await ctx.db.media.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return media;
    } catch (error) {
      console.error("Error creating media:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create media",
        cause: error,
      });
    }
  });
