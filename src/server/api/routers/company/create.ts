import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { CompanySize } from "@/generated/prisma/client";

export const createCompany = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      logoId: z.string().optional(),
      website: z.string().optional(),
      size: z.nativeEnum(CompanySize).optional(),
      foundedYear: z.number().int().optional(),
      headquarters: z.string().optional(),
      locations: z.array(z.string()).optional().default([]),
      missionStatement: z.string().optional(),
      benefits: z.string().optional(),
      culture: z.string().optional(),
      active: z.boolean().optional().default(true),
      notes: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    try {
      return await ctx.db.company.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create company",
        cause: error,
      });
    }
  });
