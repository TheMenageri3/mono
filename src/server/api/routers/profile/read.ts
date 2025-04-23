import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readProfileById = protectedProcedure
  .input(z.object({ id: z.string() }))
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

export const readProfiles = protectedProcedure.query(async ({ ctx }) => {
  try {
    return ctx.db.profile.findMany({
      where: {
        deletedAt: null,
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get profiles",
      cause: error,
    });
  }
});

export const readDeletedProfiles = protectedProcedure.query(async ({ ctx }) => {
  try {
    return ctx.db.profile.findMany({
      where: {
        deletedAt: { not: null },
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to get deleted profiles",
      cause: error,
    });
  }
});
