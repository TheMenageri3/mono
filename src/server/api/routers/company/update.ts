import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  updateCompanySchema,
  addIndustryToCompanySchema,
  removeIndustryFromCompanySchema,
} from "@/schemas";

export const updateCompany = protectedProcedure
  .input(updateCompanySchema)
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
          ...input,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update company",
        cause: error,
      });
    }
  });

export const addIndustryToCompany = protectedProcedure
  .input(addIndustryToCompanySchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.company.findUniqueOrThrow({
        where: { id: input.companyId },
      });

      if (existing.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Company already deleted",
        });
      }

      return await ctx.db.company.update({
        where: { id: input.companyId },
        data: {
          updatedById: userId,
          industries: {
            connect: {
              tagName: input.industryTagName,
            },
          },
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to add industry to company",
        cause: error,
      });
    }
  });

export const removeIndustryFromCompany = protectedProcedure
  .input(removeIndustryFromCompanySchema)
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.company.findUniqueOrThrow({
        where: { id: input.companyId },
      });

      if (existing.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Company already deleted",
        });
      }

      return await ctx.db.company.update({
        where: { id: input.companyId },
        data: {
          updatedById: userId,
          industries: {
            disconnect: {
              tagName: input.industryTagName,
            },
          },
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to remove industry from company",
        cause: error,
      });
    }
  });
