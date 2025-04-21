import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  EventAttendanceStatus,
  EventAttendanceType,
} from "@/generated/prisma/client";

export const createEventCompany = protectedProcedure
  .input(
    z.object({
      attendanceStatus: z.nativeEnum(EventAttendanceStatus),
      attendanceType: z.nativeEnum(EventAttendanceType),
      notes: z.string().optional(),
      feedback: z.string().optional(),
      eventId: z.string(),
      companyId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;

      return await ctx.db.eventCompany.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create event company",
        cause: error,
      });
    }
  });
