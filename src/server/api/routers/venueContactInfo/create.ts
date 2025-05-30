import { protectedProcedure } from "@/server/api/trpc";
import { createVenueContactInfoSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createVenueContactInfo = protectedProcedure
  .input(createVenueContactInfoSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    try {
      return await ctx.db.venueContactInfo.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create venue contact info",
        cause: error,
      });
    }
  });
