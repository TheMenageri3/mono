import { protectedProcedure } from "@/server/api/trpc";
import {
  readRolesByCompanyIdSchema,
  readRolesByProfileIdSchema,
  readRolesSchema,
  readDeletedRolesSchemas,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const readRolesByCompanyId = protectedProcedure
  .input(readRolesByCompanyIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.role.findMany({
        where: {
          deletedAt: null,
          ...(input.companyId && { companyId: input.companyId }),
        },
        take: input.limit,
        skip: input.offset,
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
  .input(readRolesByProfileIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.role.findMany({
        where: {
          deletedAt: null,
          ...(input.profileId && { profileId: input.profileId }),
        },
        take: input.limit,
        skip: input.offset,
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

export const readRoles = protectedProcedure
  .input(readRolesSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.role.findMany({
        where: {
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
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

export const readDeletedRoles = protectedProcedure
  .input(readDeletedRolesSchemas)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.role.findMany({
        where: {
          deletedAt: { not: null },
        },
        take: input.limit,
        skip: input.offset,
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
