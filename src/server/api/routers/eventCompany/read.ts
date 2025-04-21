import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  EventAttendanceStatus,
  EventAttendanceType,
} from "@/generated/prisma/client";

export const getEventCompanyById = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      return await ctx.db.eventCompany.findUniqueOrThrow({
        where: { id: input.id, deletedAt: null },
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get event company",
        cause: error,
      });
    }
  });

export const getEventCompanies = protectedProcedure
  .input(
    z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      return await ctx.db.eventCompany.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get event companies",
        cause: error,
      });
    }
  });

export const getEventCompanyByCompanyId = protectedProcedure
  .input(
    z.object({
      companyId: z.string(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.eventCompany.findMany({
        where: { companyId: input.companyId, deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get event companies by company id",
        cause: error,
      });
    }
  });

export const getEventCompaniesByEventId = protectedProcedure
  .input(
    z.object({
      eventId: z.string(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.eventCompany.findMany({
        where: { eventId: input.eventId, deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get event companies by event id",
        cause: error,
      });
    }
  });

export const getEventCompanyByAttendanceStatus = protectedProcedure
  .input(
    z.object({
      attendanceStatus: z.nativeEnum(EventAttendanceStatus),
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.eventCompany.findMany({
        where: { attendanceStatus: input.attendanceStatus, deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get event companies by attendance status",
        cause: error,
      });
    }
  });

export const getEventCompanyByAttendanceType = protectedProcedure
  .input(
    z.object({
      attendanceType: z.nativeEnum(EventAttendanceType),
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.eventCompany.findMany({
        where: { attendanceType: input.attendanceType, deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: input.limit,
        skip: input.offset,
      });
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get event companies by attendance type",
      });
    }
  });
