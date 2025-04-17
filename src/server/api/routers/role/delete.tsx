import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteRole = protectedProcedure
  .input(z.object({ id: z.string().uuid() }))
  .mutation(async ({ input, ctx }) => {
    const existing = await ctx.db.role.findUniqueOrThrow({
      where: { id: input.id },
    });
    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Role already deleted",
      });
    }
    try {
      const userId = ctx.session.user.id;
      const role = ctx.db.role.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
      return role;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete role",
        cause: error,
      });
    }
  });

export const restoreRole = protectedProcedure
  .input(z.object({ id: z.string().uuid() }))
  .mutation(async ({ input, ctx }) => {
    const existing = await ctx.db.role.findUniqueOrThrow({
      where: { id: input.id },
    });
    if (existing.deletedAt === null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Role not deleted",
      });
    }
    try {
      const userId = ctx.session.user.id;
      const role = ctx.db.role.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
      return role;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore role",
        cause: error,
      });
    }
  });
