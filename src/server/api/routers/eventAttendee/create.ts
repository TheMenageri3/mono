import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export enum EventAttendanceStatus {
  ATTENDING = "ATTENDING",
  MAYBE = "MAYBE",
  NOT_ATTENDING = "NOT_ATTENDING",
}

export enum EventAttendanceType {
  ATTENDEE = "ATTENDEE",
  SPEAKER = "SPEAKER",
  SPONSOR = "SPONSOR",
  STAFF = "STAFF",
  OTHER = "OTHER",
}

export const createEventAttendee = protectedProcedure
  .input(
    z.object({
      attendanceStatus: z.nativeEnum(EventAttendanceStatus),
      attendanceType: z.nativeEnum(EventAttendanceType),
      notes: z.string().optional(),
      feedback: z.string().optional(),
      attendeeId: z.string(),
      eventId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id;

    try {
      return await ctx.db.eventAttendee.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create event attendee",
      });
    }
  });
