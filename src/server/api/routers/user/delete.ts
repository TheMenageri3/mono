import { protectedProcedure } from "@/server/api/trpc";
import { deleteUserSchema, restoreUserSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const deleteUser = protectedProcedure
  .input(deleteUserSchema)
  .mutation(async ({ input, ctx }) => {
    const existing = await ctx.db.user.findUniqueOrThrow({
      where: { id: input.id },
    });
    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User already deleted",
      });
    }
    try {
      const user = ctx.db.user.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          status: "DELETED",
        },
      });
      return user;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete user",
        cause: error,
      });
    }
  });

export const restoreUser = protectedProcedure
  .input(restoreUserSchema)
  .mutation(async ({ input, ctx }) => {
    const existing = await ctx.db.user.findUniqueOrThrow({
      where: { id: input.id },
    });
    if (existing.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User is not deleted",
      });
    }
    try {
      const user = await ctx.db.user.update({
        where: { id: input.id },
        data: { deletedAt: null, status: "INACTIVE" },
      });
      return user;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore user",
        cause: error,
      });
    }
  });
