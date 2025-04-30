import { protectedProcedure } from "@/server/api/trpc";
import {
  getEventCompanyByIdSchema,
  getEventCompaniesSchema,
  getEventCompanyByCompanyIdSchema,
  getEventCompaniesByEventIdSchema,
  getEventCompanyByAttendanceStatusSchema,
  getEventCompanyByAttendanceTypeSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const getEventCompanyById = protectedProcedure
  .input(getEventCompanyByIdSchema)
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
  .input(getEventCompaniesSchema)
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
  .input(getEventCompanyByCompanyIdSchema)
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
  .input(getEventCompaniesByEventIdSchema)
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
  .input(getEventCompanyByAttendanceStatusSchema)
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
  .input(getEventCompanyByAttendanceTypeSchema)
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
