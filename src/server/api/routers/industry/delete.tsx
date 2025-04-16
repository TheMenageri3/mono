import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteIndustry = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.industry.findUnique({ where: { id: input.id } });

    if (!existing || existing.deletedAt !== null) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Industry not found" });
    }

    return ctx.db.industry.update({
      where: { id: input.id },
      data: {
        deletedAt: new Date(),
        updatedById: userId,
      },
    });
  });

export const restoreIndustry = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.industry.findUnique({ where: { id: input.id } });

    if (!existing) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Industry not found" });
    }
    if (existing.deletedAt === null) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Industry is not deleted" });
    }

    return ctx.db.industry.update({
      where: { id: input.id },
      data: {
        deletedAt: null,
        updatedById: userId,
      },
    });
  });
