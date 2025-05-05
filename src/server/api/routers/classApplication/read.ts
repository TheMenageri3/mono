import { protectedProcedure } from "@/server/api/trpc";
import {
  getClassApplicationsSchema,
  getClassApplicationByIdSchema,
  getClassApplicationsByClassSchema,
  getClassApplicationsByFilterSchema,
  getDeletedClassApplicationsByClassSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const getClassApplications = protectedProcedure
  .input(getClassApplicationsSchema)
  .query(async ({ ctx, input }) => {
    const classApplications = await ctx.db.classApplication.findMany({
      where: { deletedAt: null },
      include: { class: true, publisher: true },
      take: input.limit,
      skip: input.offset,
    });
    return classApplications;
  });

export const getClassApplicationById = protectedProcedure
  .input(getClassApplicationByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const classApplication = await ctx.db.classApplication.findUniqueOrThrow({
        where: { id: input.id, deletedAt: null },
        include: { class: true, publisher: true },
      });
      return classApplication;
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Class Application with ID ${input.id} was not found.`,
        cause: error,
      });
    }
  });

export const getClassApplicationsByClass = protectedProcedure
  .input(getClassApplicationsByClassSchema)
  .query(async ({ ctx, input }) => {
    const classApplications = await ctx.db.classApplication.findMany({
      where: { classId: input.classId, deletedAt: null },
      include: { class: true, publisher: true },
      take: input.limit,
      skip: input.offset,
    });
    return classApplications;
  });

export const getClassApplicationsByFilter = protectedProcedure
  .input(getClassApplicationsByFilterSchema)
  .query(async ({ ctx, input }) => {
    const classApplications = await ctx.db.classApplication.findMany({
      where: {
        ...(input.classId && { classId: input.classId }),
        ...(input.status && { status: input.status }),
        ...(input.includeDeleted ? {} : { deletedAt: null }),
        ...(input.startDatetime && {
          startDatetime: input.startDateExact
            ? new Date(input.startDatetime)
            : { gte: new Date(input.startDatetime) },
        }),
        ...(input.endDatetime && {
          endDatetime: input.endDateExact
            ? new Date(input.endDatetime)
            : { lte: new Date(input.endDatetime) },
        }),
      },
      include: { class: true, publisher: true },
      take: input.limit,
      skip: input.offset,
    });
    return classApplications;
  });

export const getDeletedClassApplicationsByClass = protectedProcedure
  .input(getDeletedClassApplicationsByClassSchema)
  .query(async ({ ctx, input }) => {
    const classApplications = await ctx.db.classApplication.findMany({
      where: {
        classId: input.classId,
        deletedAt: { not: null },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: input.limit,
      skip: input.offset,
    });
    return classApplications;
  });
