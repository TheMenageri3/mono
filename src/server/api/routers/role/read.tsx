import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
export const readRolesByCompanyId = protectedProcedure
  .input(z.object({ companyId: z.string().optional() }))
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.role.findMany({
        where: {
          deletedAt: null,
          ...(input.companyId && { companyId: input.companyId }),
        },
      });
    } catch (error) {
      console.error("Error reading roles by company ID:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read roles by company ID",
        cause: error,
      });
    }
  });

export const readRolesByProfileId = protectedProcedure
  .input(z.object({ profileId: z.string().optional() }))
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.role.findMany({
        where: {
          deletedAt: null,
          ...(input.profileId && { profileId: input.profileId }),
        },
      });
    } catch (error) {
      console.error("Error reading roles by profile ID:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read roles by profile ID",
        cause: error,
      });
    }
  });

export const readRoles = protectedProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.db.role.findMany({
      where: {
        deletedAt: null,
      },
    });
  } catch (error) {
    console.error("Error reading roles:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read roles",
      cause: error,
    });
  }
});

export const readDeletedRoles = protectedProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.db.role.findMany({
      where: {
        deletedAt: { not: null },
      },
    });
  } catch (error) {
    console.error("Error reading deleted roles:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read deleted roles",
      cause: error,
    });
  }
});
