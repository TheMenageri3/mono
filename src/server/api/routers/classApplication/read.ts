import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { start } from "repl";

export const getClassApplicationById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      const classApplication = await ctx.db.classApplication.findUniqueOrThrow({
        where: { id: input.id },
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
  .input(z.object({ classId: z.string() }))
  .query(async ({ ctx, input }) => {
    const classApplications = await ctx.db.classApplication.findMany({
      where: {
        classId: input.classId,
      },
    });
    return classApplications;
  });

export const getClassApplicationsByFilter = protectedProcedure
  .input(
    z.object({
      classId: z.string().optional(),
      status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]).optional(),
      includeDeleted: z.boolean().optional(),
      startDatetime: z.string().datetime().optional(),
      startDateExact: z.boolean().optional().default(false),
      endDatetime: z.string().datetime().optional(),
      endDateExact: z.boolean().optional().default(false),
    })
  )
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
    });
    return classApplications;
  });

export const getDeletedClassApplicationsByClass = protectedProcedure
  .input(z.object({ classId: z.string() }))
  .query(async ({ ctx, input }) => {
    const classApplications = await ctx.db.classApplication.findMany({
      where: {
        classId: input.classId,
        deletedAt: { not: null },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return classApplications;
  });
