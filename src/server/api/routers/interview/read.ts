import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readInterviews = protectedProcedure.query(async ({ ctx }) => {
  try {
    const interviews = await ctx.db.interview.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return interviews;
  } catch (error) {
    console.error("Error reading interviews:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read interviews",
      cause: error,
    });
  }
});

export const readDeletedInterviews = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      const interviews = await ctx.db.interview.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return interviews;
    } catch (error) {
      console.error("Error reading deleted interviews:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted interviews",
        cause: error,
      });
    }
  }
);

export const getInterviewById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      const interview = await ctx.db.interview.findUnique({
        where: {
          id: input.id,
        },
      });
      return interview;
    } catch (error) {
      console.error("Error getting interview by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get interview",
        cause: error,
      });
    }
  });

export const getInterviewByData = protectedProcedure
  .input(
    z.object({
        type: z.enum([
            "PHONE_SCREEN",
            "TECHNICAL",
            "BEHAVIORAL",
            "ONSITE",
            "FINAL",
          ]).optional(),
          scheduledDate: z.string().datetime().optional(),
          durationMinutes: z.number().optional(),
          interviewLocationType: z.enum(["PHYSICAL", "VIRTUAL"]).optional(),
          preparationNotes: z.string().optional(),
          status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED"]).optional(),
          feedback: z.string().optional(),
          candidateFeedback: z.string().optional(),
          nextSteps: z.string().optional(),
          intervieweeId: z.string().optional(),
          jobApplicationId: z.string().optional(),
          companyContactId: z.string().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      const interview = await ctx.db.interview.findMany({
        where: {
          ...input,
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return interview;
    } catch (error) {
      console.error("Error getting interview by data:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get interview",
        cause: error,
      });
    }
  });
