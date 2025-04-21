import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { EventAttendanceStatus, EventAttendanceType } from "@/generated/prisma/client";

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
