import { protectedProcedure } from "@/server/api/trpc";
import { createRoleSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createRole = protectedProcedure
  .input(createRoleSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      const role = await ctx.db.role.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return role;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create role",
        cause: error,
      });
    }
  });
