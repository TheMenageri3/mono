import { protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { createUserSkillSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createUserSkill = protectedProcedure
  .input(createUserSkillSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    try {
      return await ctx.db.userSkill.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
          tagId: input.tagId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create user skill",
        cause: error,
      });
    }
  });
