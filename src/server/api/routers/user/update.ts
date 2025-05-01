import { protectedProcedure } from "@/server/api/trpc";
import { updateUserSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateUser = protectedProcedure
  .input(updateUserSchema)
  .mutation(async ({ ctx, input }) => {
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
      const user = await ctx.db.user.update({
        where: { id: input.id },
        data: {
          ...input,
        },
      });
      return user;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error updating user",
        cause: error,
      });
    }
  });
