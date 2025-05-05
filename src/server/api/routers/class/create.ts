import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createClassSchema } from "@/schemas";

export const createClass = protectedProcedure
  .input(createClassSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const class_ = await ctx.db.class.create({
        data: {
          title: input.title,
          description: input.description,
          shortDescription: input.shortDescription,
          year: input.year,
          quarter: input.quarter,
          status: input.status,
          startDatetime: input.startDatetime,
          endDatetime: input.endDatetime,
          enrollmentCapacity: input.enrollmentCapacity,
          syllabusUrl: input.syllabusUrl,
          meetingSchedule: input.meetingSchedule,
          location: input.location,
          createdById: userId,
          updatedById: userId,
        },
      });
      return class_;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create class",
        cause: error,
      });
    }
  });
