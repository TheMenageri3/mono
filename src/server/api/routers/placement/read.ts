import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readPlacements = protectedProcedure.query(async ({ ctx }) => {
  try {
    const placements = await ctx.db.placement.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return placements;
  } catch (error) {
    console.error("Error reading placements:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read placements",
      cause: error,
    });
  }
});

export const readDeletedPlacements = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      const placements = await ctx.db.placement.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return placements;
    } catch (error) {
      console.error("Error reading deleted placements:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted placements",
        cause: error,
      });
    }
  }
);

export const getPlacementById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      const placement = await ctx.db.placement.findUnique({
        where: {
          id: input.id,
        },
      });
      return placement;
    } catch (error) {
      console.error("Error getting placement by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get placement",
        cause: error,
      });
    }
  });

export const getPlacementByData = protectedProcedure
  .input(
    z.object({
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
  .query(async ({ ctx, input }) => {
    try {
      const placements = await ctx.db.placement.findMany({
        where: {
          ...input,
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return placements;
    } catch (error) {
      console.error("Error getting placements by data:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get placements",
        cause: error,
      });
    }
  });
