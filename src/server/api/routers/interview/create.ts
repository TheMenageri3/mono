import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  InterviewLocationType,
  InterviewStatus,
  InterviewType,
} from "@/generated/prisma/client";

export const createInterview = protectedProcedure
  .input(
    z.object({
      type: z.nativeEnum(InterviewType),
      scheduledDate: z.string().datetime(),
      durationMinutes: z.number(),
      interviewLocationType: z.nativeEnum(InterviewLocationType),
      preparationNotes: z.string().optional(),
      status: z.nativeEnum(InterviewStatus),
      feedback: z.string().optional(),
      candidateFeedback: z.string().optional(),
      nextSteps: z.string().optional(),
      intervieweeId: z.string(),
      jobApplicationId: z.string(),
      companyContactId: z.string().optional(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const interview = await ctx.db.interview.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return interview;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create interview",
        cause: error,
      });
    }
  });
