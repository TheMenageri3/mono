import { protectedProcedure } from "@/server/api/trpc";
import {
  readProfileByIdSchema,
  readProfilesSchema,
  readDeletedProfilesSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const readProfileById = protectedProcedure
  .input(readProfileByIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return ctx.db.profile.findUnique({
        where: {
          id: input.id,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get profile",
        cause: error,
      });
    }
  });

export const readProfiles = protectedProcedure
  .input(readProfilesSchema)
  .query(async ({ ctx, input }) => {
    try {
      return ctx.db.profile.findMany({
        where: {
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get profiles",
        cause: error,
      });
    }
  });

export const readDeletedProfiles = protectedProcedure
  .input(readDeletedProfilesSchema)
  .query(async ({ ctx, input }) => {
    try {
      return ctx.db.profile.findMany({
        where: {
          deletedAt: { not: null },
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get deleted profiles",
        cause: error,
      });
    }
  });
