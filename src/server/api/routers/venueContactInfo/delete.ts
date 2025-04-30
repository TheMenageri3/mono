import { protectedProcedure } from "@/server/api/trpc";
import {
  deleteVenueContactInfoSchema,
  restoreVenueContactInfoSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const deleteVenueContactInfo = protectedProcedure
  .input(deleteVenueContactInfoSchema)
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
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete venue contact info",
        cause: error,
      });
    }
  });

export const restoreVenueContactInfo = protectedProcedure
  .input(restoreVenueContactInfoSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    try {
      const existing = await ctx.db.venueContactInfo.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existing.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Venue contact info is not deleted",
        });
      }

      return await ctx.db.venueContactInfo.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore venue contact info",
        cause: error,
      });
    }
  });
