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
      compensationDetails: z.string(),
      matchQuality: z.enum(["EXCELLENT", "GOOD", "FAIR", "POOR"]),
      verified: z.boolean(),
      verificationDate: z.string().datetime().optional(),
      jobApplicationId: z.string().optional(),
      companyId: z.string(),
      profileId: z.string(),
      placementFacilitatorId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const placement = await ctx.db.placement.create({
        data: {
          jobTitle: input.jobTitle,
          employmentType: input.employmentType,
          startDate: input.startDate,
          endDate: input.endDate || null,
          isCurrent: input.isCurrent,
          salary: input.salary,
          compensationDetails: input.compensationDetails,
          matchQuality: input.matchQuality,
          verified: input.verified,
          verificationDate: input.verificationDate || null,
          jobApplicationId: input.jobApplicationId || null,
          companyId: input.companyId,
          profileId: input.profileId,
          placementFacilitatorId: input.placementFacilitatorId,
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
