import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readIndustries = protectedProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.db.industry.findMany({
      where: { deletedAt: null },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch industries",
    });
  }
});

export const getIndustryById = protectedProcedure
  .input(z.object({ id: z.string() }))
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

export const readDeletedIndustries = protectedProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.db.industry.findMany({
      where: { deletedAt: { not: null } },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch deleted industries",
    });
  }
});
