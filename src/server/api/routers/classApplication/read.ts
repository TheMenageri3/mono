import { protectedProcedure } from "@/server/api/trpc";
import {
  getClassApplicationsSchema,
  getClassApplicationByIdSchema,
  getClassApplicationsByFilterSchema,
  getDeletedClassApplicationsSchema,
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

export const getClassApplicationsByFilter = protectedProcedure
  .input(getClassApplicationsByFilterSchema)
  .query(async ({ ctx, input }) => {
    const classApplications = await ctx.db.classApplication.findMany({
      where: {
        ...(input.title && { title: input.title }),
        ...(input.description && { description: input.description }),
        ...(input.status && { status: input.status }),
        ...(input.startDatetime && {
          startDatetime: { gte: new Date(input.startDatetime) },
        }),
        ...(input.endDatetime && {
          endDatetime: { lte: new Date(input.endDatetime) },
        }),
        ...(input.classId && { classId: input.classId }),
        ...(input.includeDeleted ? {} : { deletedAt: null }),
      },
      include: { class: true, publisher: true },
      take: input.limit,
      skip: input.offset,
    });
    return classApplications;
  });

export const getDeletedClassApplications = protectedProcedure
  .input(getDeletedClassApplicationsSchema)
  .query(async ({ ctx, input }) => {
    const classApplications = await ctx.db.classApplication.findMany({
      where: {
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
