import { protectedProcedure } from "@/server/api/trpc";
import { deleteProfileSchema, restoreProfileSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const deleteProfile = protectedProcedure
  .input(deleteProfileSchema)
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
      return ctx.db.profile.update({
        where: { id: input.id },
        data: { deletedAt: new Date(), updatedById: userId },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete profile",
        cause: error,
      });
    }
  });

export const restoreProfile = protectedProcedure
  .input(restoreProfileSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.profile.findUniqueOrThrow({
      where: { id: input.id },
    });
    if (existing.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Profile is not deleted",
      });
    }
    try {
      return ctx.db.profile.update({
        where: { id: input.id },
        data: { deletedAt: null, updatedById: userId },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore profile",
        cause: error,
      });
    }
  });
