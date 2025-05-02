import { protectedProcedure } from "@/server/api/trpc";
import { updateLocationSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateLocation = protectedProcedure
  .input(updateLocationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.location.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Location already deleted",
      });
    }

    try {
      const location = await ctx.db.location.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });

      return location;
    } catch (error) {
      console.error("Error updating location:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update location",
        cause: error,
      });
    }
  });
