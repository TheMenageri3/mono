import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updatePlacement = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      jobTitle: z.string().optional(),
      employmentType: z
        .enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"])
        .optional(),
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      isCurrent: z.boolean().optional(),
      salary: z.number().optional(),
      compensationDetails: z.string().optional(),
      matchQuality: z.enum(["EXCELLENT", "GOOD", "FAIR", "POOR"]).optional(),
      verified: z.boolean().optional(),
      verificationDate: z.string().datetime().optional(),
      jobApplicationId: z.string().optional(),
      companyId: z.string().optional(),
      profileId: z.string().optional(),
      placementFacilitatorId: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingPlacement = await ctx.db.placement.findUnique({
      where: { id: input.id },
    });

    if (!existingPlacement || existingPlacement.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Placement not found",
      });
    }

    try {
      const placement = await ctx.db.placement.update({
        where: {
          id: input.id,
        },
        data: {
          jobTitle: input.jobTitle,
          employmentType: input.employmentType,
          startDate: input.startDate,
          endDate: input.endDate,
          isCurrent: input.isCurrent,
          salary: input.salary,
          compensationDetails: input.compensationDetails,
          matchQuality: input.matchQuality,
          verified: input.verified,
          verificationDate: input.verificationDate,
          jobApplicationId: input.jobApplicationId,
          companyId: input.companyId,
          profileId: input.profileId,
          placementFacilitatorId: input.placementFacilitatorId,
          updatedById: userId,
        },
      });
      return placement;
    } catch (error) {
      console.error("Error updating placement:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update placement",
        cause: error,
      });
    }
  });
