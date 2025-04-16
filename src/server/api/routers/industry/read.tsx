// server/api/routers/industry/read.ts
import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readIndustries = protectedProcedure.query(async ({ ctx }) => {
  return ctx.db.industry.findMany({
    where: { deletedAt: null },
    orderBy: { name: "asc" },
  });
});

export const getIndustryById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const industry = await ctx.db.industry.findUnique({
      where: { id: input.id },
    });

    if (!industry) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Industry not found",
      });
    }

    return industry;
  });

export const readDeletedIndustries = protectedProcedure.query(async ({ ctx }) => {
  return ctx.db.industry.findMany({
    where: { deletedAt: { not: null } },
    orderBy: { name: "asc" },
  });
});
