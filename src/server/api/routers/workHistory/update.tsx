import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateWorkHistory = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      companyName: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      startDate: z.date().optional(),
      endDate: z.date().nullable().optional(),
      isCurrent: z.boolean().optional(),
      location: z.string().optional(),
      employmentType: z.enum([
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
        "INTERNSHIP",
      ]).optional(),
      achievements: z.string().optional(),
      references: z.string().optional(),
      verified: z.boolean().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existingWorkHistory = await ctx.db.workHistory.findUnique({
      where: { id: input.id },
    });

    if (!existingWorkHistory || existingWorkHistory.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Work history record not found",
      });
    }

    // Business logic: if isCurrent is true, endDate must be null/undefined
    if (input.isCurrent === true && input.endDate !== undefined && input.endDate !== null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "endDate must not be set if isCurrent is true",
        });
    }

    try {
      const workHistory = await ctx.db.workHistory.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });

      return workHistory;
    } catch (error) {
      console.error("Error updating work history:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update work history",
        cause: error,
      });
    }
  });
