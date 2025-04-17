import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createPlacement = protectedProcedure
  .input(
    z.object({
      jobTitle: z.string(),
      employmentType: z.enum([
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
      ]),
      startDate: z.string().datetime(),
      endDate: z.string().datetime().optional(),
      isCurrent: z.boolean(),
      salary: z.number(),
      compensationDetails: z.string().optional(),
      matchQuality: z.enum(["EXCELLENT", "GOOD", "FAIR", "POOR"]),
      verified: z.boolean(),
      verificationDate: z.string().datetime().optional(),
      profileId: z.string(),
      placementFacilitatorId: z.string(),
      companyId: z.string(),
      jobApplicationId: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const placement = await ctx.db.placement.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return placement;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create placement",
        cause: error,
      });
    }
  });
