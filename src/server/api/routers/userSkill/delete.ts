import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { deleteUserSkillSchema, restoreUserSkillSchema } from "@/schemas";

export const deleteUserSkill = protectedProcedure
  .input(deleteUserSkillSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.userSkill.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (existing.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User skill already deleted",
        });
      }
      return await ctx.db.userSkill.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete user skill",
        cause: error,
      });
    }
  });

export const restoreUserSkill = protectedProcedure
  .input(restoreUserSkillSchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.userSkill.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (existing.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User skill is not deleted",
        });
      }
      return await ctx.db.userSkill.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore user skill",
        cause: error,
      });
    }
  });
