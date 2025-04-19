import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { EventAttendanceStatus, EventAttendanceType } from "@/generated/prisma";

export const getEventAttendeeById = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.eventAttendee.findUnique({
        where: {
          id: input.id,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to get event attendee",
      });
    }
  });

export const getEventAttendeesByEventId = protectedProcedure
  .input(
    z.object({
      eventId: z.string(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.eventAttendee.findMany({
        where: {
          eventId: input.eventId,
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to get event attendees",
      });
    }
  });

export const getEventAttendeesByStatus = protectedProcedure
  .input(
    z.object({
      status: z.nativeEnum(EventAttendanceStatus),
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.eventAttendee.findMany({
        where: {
          attendanceStatus: input.status,
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to get event attendees",
      });
    }
  });

export const getEventAttendeesByType = protectedProcedure
  .input(
    z.object({
      type: z.nativeEnum(EventAttendanceType),
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.eventAttendee.findMany({
        where: {
          attendanceType: input.type,
          deletedAt: null,
        },
        take: input.limit,
        skip: input.offset,
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to get event attendees",
      });
    }
  });

export const getDeletedEventAttendees = protectedProcedure
  .input(
    z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.eventAttendee.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
        take: input.limit,
        skip: input.offset,
        orderBy: {
          deletedAt: "desc",
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Failed to get deleted event attendees",
      });
    }
  });
