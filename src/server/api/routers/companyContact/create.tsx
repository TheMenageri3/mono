import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { EngagementLevel } from "@/generated/prisma/client";

export const createCompanyContact = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      department: z.string().optional(),
      isPrimary: z.boolean().optional().default(false),
      engagementLevel: z.nativeEnum(EngagementLevel).optional().default(EngagementLevel.PASSIVE),
      lastContactDate: z.date().optional(),
      notes: z.string().optional(),
      companyId: z.string(),
      userId: z.string(),
      profileId: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    try {
      return await ctx.db.companyContact.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create company contact",
        cause: error,
      });
    }
  });
