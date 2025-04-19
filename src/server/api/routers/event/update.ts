import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { EventType, EventStatus } from "./create";

export const updateEvent = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      shortDescription: z.string().optional(),
      type: z.nativeEnum(EventType).optional(),
      isVirtual: z.boolean().optional(),
      virtualMeetingUrl: z.string().optional(),
      startDatetime: z.date().optional(),
      endDatetime: z.date().optional(),
      timezone: z.string().optional(),
      registrationRequired: z.boolean().optional(),
      registrationUrl: z.string().optional(),
      registrationDeadline: z.date().optional(),
      capacity: z.number().optional(),
      cost: z.number().optional(),
      status: z.nativeEnum(EventStatus).optional(),
      featured: z.boolean().optional(),
      organizerId: z.string().optional(),
      locationId: z.string().optional(),
      parentEventId: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id;

    const existing = await ctx.db.event.findUniqueOrThrow({
      where: {
        id: input.id,
      },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Event has been deleted.",
      });
    }

    try {
      return await ctx.db.event.update({
        where: {
          id: input.id,
          deletedAt: null,
        },
        data: {
          ...input,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update event",
        cause: error,
      });
    }
  });
