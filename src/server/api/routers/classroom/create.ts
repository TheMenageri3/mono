import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { QuarterType, StatusType } from "@/generated/prisma/client";

export const createClassroom = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      shortDescription: z.string(),
      year: z.number(),
      quarter: z.nativeEnum(QuarterType),
      status: z.nativeEnum(StatusType),
      startDate: z.string().datetime(),
      endDate: z.string().datetime(),
      enrollmentCapacity: z.number(),
      syllabusUrl: z.string().url(),
      meetingSchedule: z.any(),
      location: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const classroom = await ctx.db.class.create({
        data: {
          title: input.title,
          description: input.description,
          shortDescription: input.shortDescription,
          year: input.year,
          quarter: input.quarter,
          status: input.status,
          startDate: input.startDate,
          endDate: input.endDate,
          enrollmentCapacity: input.enrollmentCapacity,
          syllabusUrl: input.syllabusUrl,
          meetingSchedule: input.meetingSchedule,
          location: input.location,
          createdById: userId,
          updatedById: userId,
        },
      });
      return classroom;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create classroom",
        cause: error,
      });
    }
  });
