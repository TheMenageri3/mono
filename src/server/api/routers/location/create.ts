import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createLocationSchema } from "@/schemas";

export const createLocation = protectedProcedure
  .input(createLocationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const location = await ctx.db.location.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return location;
    } catch (error) {
      console.error("Error creating location:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create location",
        cause: error,
      });
    }
  });
