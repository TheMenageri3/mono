import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteCompany = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.company.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existing.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Company already deleted",
        });
      }

      return await ctx.db.company.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
          active: false,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete company",
        cause: error,
      });
    }
  });

export const restoreCompany = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.company.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existing.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Company is not deleted",
        });
      }

      return await ctx.db.company.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore company",
        cause: error,
      });
    }
  });
