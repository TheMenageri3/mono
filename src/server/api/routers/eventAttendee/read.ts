import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  getEventAttendeeByIdSchema,
  getEventAttendeesByEventIdSchema,
  getEventAttendeesByStatusSchema,
  getEventAttendeesByTypeSchema,
  getDeletedEventAttendeesSchema,
} from "@/schemas";

export const getEventAttendeeById = protectedProcedure
  .input(getEventAttendeeByIdSchema)
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
  .input(getEventAttendeesByEventIdSchema)
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
  .input(getEventAttendeesByStatusSchema)
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
  .input(getEventAttendeesByTypeSchema)
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
  .input(getDeletedEventAttendeesSchema)
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
