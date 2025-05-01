import { protectedProcedure } from "@/server/api/trpc";
import { updateProfileSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateProfile = protectedProcedure
  .input(updateProfileSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.profile.findUniqueOrThrow({
      where: { id: input.id },
    });
    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Profile already deleted",
      });
    }
    try {
      const profile = await ctx.db.profile.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return profile;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update profile",
        cause: error,
      });
    }
  });
