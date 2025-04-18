import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readCompanyById = publicProcedure
  .input(z.object({ id: z.string() }))
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
  .input(
    z
      .object({
        active: z.boolean().optional(),
      })
      .optional()
  )
  .query(async ({ input, ctx }) => {
    try {
      return await ctx.db.company.findMany({
        where: {
          deletedAt: null,
          ...(input?.active !== undefined ? { active: input.active } : {}),
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read companies",
        cause: error,
      });
    }
  });

export const readDeletedCompanies = publicProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.db.company.findMany({
      where: {
        deletedAt: { not: null },
      },
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
  .input(z.object({ industry: z.string() }))
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
  .input(z.object({ query: z.string() }))
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
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to search companies",
        cause: error,
      });
    }
  });
