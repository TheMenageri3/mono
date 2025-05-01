import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  getAssignmentByIdSchema,
  getAssignmentsByClassSchema,
  getDeletedAssignmentsByClassSchema,
  getAssignmentsByFilterSchema,
} from "@/schemas";

// Get assignment by ID
const getAssignmentById = protectedProcedure
  .input(getAssignmentByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const assignment = await ctx.db.assignment.findUniqueOrThrow({
        where: { id: input.id },
      });

      return assignment;
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Assignment with ID ${input.id} was not found.`,
        cause: error,
      });
    }
  });

// Get all active (non-deleted) assignments for a class
const getAssignmentsByClass = protectedProcedure
  .input(getAssignmentsByClassSchema)
  .query(async ({ ctx, input }) => {
    return await ctx.db.assignment.findMany({
      where: {
        classId: input.classId,
        deletedAt: null,
      },
      orderBy: { updatedAt: "desc" },
      take: input.limit,
      skip: input.offset,
    });
  });

// Get deleted assignments for a class
export const getDeletedAssignmentsByClass = protectedProcedure
  .input(getDeletedAssignmentsByClassSchema)
  .query(async ({ ctx, input }) => {
    return await ctx.db.assignment.findMany({
      where: {
        classId: input.classId,
        deletedAt: { not: null },
      },
      orderBy: { updatedAt: "desc" },
      take: input.limit,
      skip: input.offset,
    });
  });

// Filter assignments by optional classId, releaseDate, dueDate
const getAssignmentsByFilter = protectedProcedure
  .input(getAssignmentsByFilterSchema)
  .query(async ({ ctx, input }) => {
    return await ctx.db.assignment.findMany({
      where: {
        ...(input.classId && { classId: input.classId }),
        ...(input.releaseDate && { releaseDate: input.releaseDate }),
        ...(input.dueDate && { dueDate: input.dueDate }),
        ...(input.includeDeleted ? {} : { deletedAt: null }),
      },
      orderBy: { updatedAt: "desc" },
      take: input.limit,
      skip: input.offset,
    });
  });

// Export all procedures for use in router
export {
  getAssignmentById,
  getAssignmentsByClass as readAssignments,
  getDeletedAssignmentsByClass as readDeletedAssignments,
  getAssignmentsByFilter,
};
