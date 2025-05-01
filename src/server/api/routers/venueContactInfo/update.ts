import { protectedProcedure } from "@/server/api/trpc";
import { updateVenueContactInfoSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateVenueContactInfo = protectedProcedure
  .input(updateVenueContactInfoSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    try {
      const existing = await ctx.db.venueContactInfo.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existing.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Venue contact info already deleted",
        });
      }

      return await ctx.db.venueContactInfo.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update venue contact info",
        cause: error,
      });
    }
  });
