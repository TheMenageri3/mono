import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readUserSkillsByProfileId = publicProcedure
  .input(z.object({ profileId: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.userSkill.findMany({
        where: {
          profileId: input.profileId,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read user skills",
        cause: error,
      });
    }
  });

export const readDeletedUserSkillsByProfileId = publicProcedure
  .input(z.object({ profileId: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.userSkill.findMany({
        where: {
          profileId: input.profileId,
          deletedAt: { not: null },
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted user skills",
        cause: error,
      });
    }
  });

export const readUserSkillById = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.userSkill.findUnique({
        where: {
          id: input.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read user skill",
        cause: error,
      });
    }
  });

export const readUserSkills = publicProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.db.userSkill.findMany({
      where: {
        deletedAt: null,
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read user skills",
      cause: error,
    });
  }
});

export const readDeletedUserSkills = publicProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.db.userSkill.findMany({
      where: {
        deletedAt: { not: null },
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read deleted user skills",
      cause: error,
    });
  }
});
