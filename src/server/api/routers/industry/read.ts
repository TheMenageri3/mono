import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  readIndustriesSchema,
  getIndustryByIdSchema,
  readDeletedIndustriesSchema,
} from "@/schemas";

export const readIndustries = protectedProcedure
  .input(readIndustriesSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.industry.findMany({
        where: { deletedAt: null },
        orderBy: { name: "asc" },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch industries",
        cause: error,
      });
    }
  });

export const getIndustryById = protectedProcedure
  .input(getIndustryByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const industry = await ctx.db.industry.findUniqueOrThrow({
        where: { id: input.id },
      });

      return industry;
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Industry not found",
      });
    }
  });

export const readDeletedIndustries = protectedProcedure
  .input(readDeletedIndustriesSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.industry.findMany({
        where: { deletedAt: { not: null } },
        orderBy: { name: "asc" },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch deleted industries",
        cause: error,
      });
    }
  });
