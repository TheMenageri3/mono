import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateInterview = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      type: z
        .enum(["PHONE_SCREEN", "TECHNICAL", "BEHAVIORAL", "ONSITE", "FINAL"])
        .optional(),
      scheduledDate: z.string().datetime().optional(),
      durationMinutes: z.number().optional(),
      interviewLocationType: z.enum(["PHYSICAL", "VIRTUAL"]).optional(),
      preparationNotes: z.string().optional(),
      status: z
        .enum(["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED"])
        .optional(),
      feedback: z.string().optional(),
      candidateFeedback: z.string().optional(),
      nextSteps: z.string().optional(),
      intervieweeId: z.string().optional(),
      jobApplicationId: z.string().optional(),
      companyContactId: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingInterview = await ctx.db.interview.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existingInterview.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Interview already deleted",
      });
    }

    try {
      const interview = await ctx.db.interview.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return interview;
    } catch (error) {
      console.error("Error updating interview:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update interview",
        cause: error,
      });
    }
  });
