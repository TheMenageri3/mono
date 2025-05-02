import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { EmploymentType } from "@/generated/prisma/client";

export const createWorkHistory = protectedProcedure
  .input(
    z
      .object({
        companyName: z.string(),
        title: z.string(),
        description: z.string(),
        startDatetime: z.date(),
        endDatetime: z.date().optional(),
        isCurrent: z.boolean(),
        location: z.string(),
        employmentType: z.nativeEnum(EmploymentType),
        achievements: z.string().optional(),
        references: z.string().optional(),
        verified: z.boolean(),
        profileId: z.string(),
      })
      .refine(
        (data) => {
          // Enforce correct relationship between endDate and isCurrent
          if (data.isCurrent) return !data.endDatetime;
          return !!data.endDatetime;
        },
        {
          message:
            "If the job is current, end date must be empty. If it's not current, end date is required.",
          path: ["endDate"],
        }
      )
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;

    try {
      const workHistory = await ctx.db.workHistory.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });

      return workHistory;
    } catch (error) {
      console.error("Error creating work history:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create work history",
        cause: error,
      });
    }
  });
