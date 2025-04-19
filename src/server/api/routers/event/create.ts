import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export enum EventType {
  CONFERENCE = "CONFERENCE",
  WORKSHOP = "WORKSHOP",
  NETWORKING = "NETWORKING",
  HACKATHON = "HACKATHON",
  CAREER_FAIR = "CAREER_FAIR",
  INFO_SESSION = "INFO_SESSION",
}

export enum EventStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export const createEvent = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      shortDescription: z.string(),
      type: z.nativeEnum(EventType),
      isVirtual: z.boolean(),
      virtualMeetingUrl: z.string().optional(),
      startDatetime: z.date(),
      endDatetime: z.date(),
      timezone: z.string(),
      registrationRequired: z.boolean(),
      registrationUrl: z.string().optional(),
      registrationDeadline: z.date().optional(),
      capacity: z.number().optional(),
      cost: z.number().optional(),
      status: z.nativeEnum(EventStatus),
      featured: z.boolean(),
      organizerId: z.string(),
      locationId: z.string(),
      parentEventId: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user.id;

    try {
      return await ctx.db.event.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create event",
        cause: error,
      });
    }
  });
