import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  readUserSkillsByProfileIdSchema,
  readDeletedUserSkillsByProfileIdSchema,
  readUserSkillByIdSchema,
  readUserSkillsSchema,
  readDeletedUserSkillsSchema,
} from "@/schemas";

export const readUserSkillsByProfileId = publicProcedure
  .input(readUserSkillsByProfileIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.userSkill.findMany({
        where: {
          profileId: input.profileId,
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
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
  .input(readDeletedUserSkillsByProfileIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.userSkill.findMany({
        where: {
          profileId: input.profileId,
          deletedAt: { not: null },
        },
        take: input.limit,
        skip: input.offset,
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
  .input(readUserSkillByIdSchema)
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

export const readUserSkills = publicProcedure
  .input(readUserSkillsSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.userSkill.findMany({
        where: {
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read user skills",
        cause: error,
      });
    }
  });

export const readDeletedUserSkills = publicProcedure
  .input(readDeletedUserSkillsSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.userSkill.findMany({
        where: {
          deletedAt: { not: null },
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted user skills",
        cause: error,
      });
    }
  });
