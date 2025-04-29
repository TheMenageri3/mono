import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateRoleSchema } from "@/schemas";

export const updateRole = protectedProcedure
  .input(updateRoleSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      return await ctx.db.role.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedAt: new Date(),
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update role",
        cause: error,
      });
    }
  });
