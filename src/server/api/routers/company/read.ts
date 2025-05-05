import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  readCompanyByIdSchema,
  readCompaniesSchema,
  readDeletedCompaniesSchema,
  readCompaniesByIndustrySchema,
  searchCompaniesSchema,
} from "@/schemas";

export const readCompanyById = publicProcedure
  .input(readCompanyByIdSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.company.findUnique({
        where: {
          id: input.id,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read company",
        cause: error,
      });
    }
  });

export const readCompanies = publicProcedure
  .input(readCompaniesSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.company.findMany({
        where: {
          deletedAt: null,
          ...(input?.active !== undefined ? { active: input.active } : {}),
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read companies",
        cause: error,
      });
    }
  });

export const readDeletedCompanies = publicProcedure
  .input(readDeletedCompaniesSchema)
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.company.findMany({
        where: {
          deletedAt: { not: null },
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted companies",
        cause: error,
      });
    }
  });

export const readCompaniesByIndustry = publicProcedure
  .input(readCompaniesByIndustrySchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.company.findMany({
        where: {
          deletedAt: null,
          industries: {
            some: {
              tagName: input.industry,
            },
          },
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read companies by industry",
        cause: error,
      });
    }
  });

export const searchCompanies = publicProcedure
  .input(searchCompaniesSchema)
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.company.findMany({
        where: {
          deletedAt: null,
          OR: [
            { name: { contains: input.query, mode: "insensitive" } },
            { description: { contains: input.query, mode: "insensitive" } },
            { headquarters: { contains: input.query, mode: "insensitive" } },
          ],
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to search companies",
        cause: error,
      });
    }
  });
