import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { EventAttendanceStatus, EventAttendanceType } from "./create";

export const updateEventCompany = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      attendanceStatus: z.nativeEnum(EventAttendanceStatus).optional(),
      attendanceType: z.nativeEnum(EventAttendanceType).optional(),
      notes: z.string().optional(),
      feedback: z.string().optional(),
      eventId: z.string().optional(),
      companyId: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      const existingEventCompany = await ctx.db.eventCompany.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existingEventCompany.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event company delted",
        });
      }

      return await ctx.db.eventCompany.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update event company",
      });
    }
  });
