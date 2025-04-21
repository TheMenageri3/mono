import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { EventStatus, EventType } from "@/generated/prisma/client";

export const getEventById = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.event.findUnique({
        where: {
          id: input.id,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Event with id ${input.id} not found`,
        cause: error,
      });
    }
  });

export const getEventsByCompanyId = protectedProcedure
  .input(
    z.object({
      organizerId: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.event.findMany({
        where: {
          organizerId: input.organizerId,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Events for organizer with id ${input.organizerId} not found`,
        cause: error,
      });
    }
  });

export const getEventsByLocationId = protectedProcedure
  .input(
    z.object({
      locationId: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.event.findMany({
        where: {
          locationId: input.locationId,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Events for location with id ${input.locationId} not found`,
        cause: error,
      });
    }
  });

export const getFeaturedEvents = protectedProcedure
  .input(
    z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.event.findMany({
        where: {
          featured: true,
          deletedAt: null,
        },
        orderBy: {
          startDatetime: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get featured events",
        cause: error,
      });
    }
  });

  export const getEventsByStatus = protectedProcedure
  .input(z.object({
    status: z.nativeEnum(EventStatus),
    limit: z.number().optional(),
    offset: z.number().optional(),
  }))
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.event.findMany({
        where: {
          status: input.status,
          deletedAt: null,
        },
        orderBy: {
          startDatetime: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get events by status",
        cause: error,
      });
    }
  });

  export const getEventsByType = protectedProcedure
  .input(z.object({
    type: z.nativeEnum(EventType),
    limit: z.number().optional(),
    offset: z.number().optional(),
  }))
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.event.findMany({
        where: {
          type: input.type,
          deletedAt: null,
        },
        orderBy: {
          startDatetime: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get events by type",
        cause: error,
      });
    }
  });