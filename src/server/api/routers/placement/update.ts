import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { EmploymentType, MatchQuality } from "@/generated/prisma/client";

export const updatePlacement = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      jobTitle: z.string().optional(),
      employmentType: z.nativeEnum(EmploymentType).optional(),
      startDatetime: z.string().datetime().optional(),
      endDatetime: z.string().datetime().optional(),
      isCurrent: z.boolean().optional(),
      salary: z.number().optional(),
      compensationDetails: z.string().optional(),
      matchQuality: z.nativeEnum(MatchQuality).optional(),
      verified: z.boolean().optional(),
      verificationDate: z.string().datetime().optional(),
      profileId: z.string().optional(),
      placementFacilitatorId: z.string().optional(),
      companyId: z.string().optional(),
      jobApplicationId: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingPlacement = await ctx.db.placement.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existingPlacement.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Placement already deleted",
      });
    }

    try {
      const placement = await ctx.db.placement.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
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
