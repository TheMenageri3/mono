import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { CompanySize } from "@/generated/prisma/client";

export const updateCompany = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
      logoId: z.string().optional(),
      website: z.string().optional(),
      size: z
        .nativeEnum(CompanySize)
        .optional(),
      foundedYear: z.number().int().optional(),
      headquarters: z.string().optional(),
      locations: z.array(z.string()).optional(),
      missionStatement: z.string().optional(),
      benefits: z.string().optional(),
      culture: z.string().optional(),
      active: z.boolean().optional(),
      notes: z.string().optional(),
    })
  )
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
  .input(
    z.object({
      companyId: z.string(),
      industryTagName: z.string(),
    })
  )
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
  .input(
    z.object({
      companyId: z.string(),
      industryTagName: z.string(),
    })
  )
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
