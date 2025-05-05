import { protectedProcedure } from "@/server/api/trpc";
import { createPlacementSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createPlacement = protectedProcedure
  .input(createPlacementSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const placement = await ctx.db.placement.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return placement;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create placement",
        cause: error,
      });
    }
  });
