import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

// Get assignment by ID
const getAssignmentById = protectedProcedure
  .input(z.object({ id: z.string() }))
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
  .input(z.object({ classId: z.string() }))
  .query(async ({ ctx, input }) => {
    return await ctx.db.assignment.findMany({
      where: {
        classId: input.classId,
        deletedAt: null,
      },
      orderBy: { updatedAt: "desc" },
    });
  });

// Get deleted assignments for a class
export const getDeletedAssignmentsByClass = protectedProcedure
  .input(z.object({ classId: z.string() }))
  .query(async ({ ctx, input }) => {
    return await ctx.db.assignment.findMany({
      where: {
        classId: input.classId,
        deletedAt: { not: null },
      },
      orderBy: { updatedAt: "desc" },
    });
  });

// Filter assignments by optional classId, releaseDate, dueDate
const getAssignmentsByFilter = protectedProcedure
  .input(
    z.object({
      classId: z.string().optional(),
      releaseDate: z.string().datetime().optional(),
      dueDate: z.string().datetime().optional(),
      includeDeleted: z.boolean().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    return await ctx.db.assignment.findMany({
      where: {
        ...(input.classId && { classId: input.classId }),
        ...(input.releaseDate && { releaseDate: input.releaseDate }),
        ...(input.dueDate && { dueDate: input.dueDate }),
        ...(input.includeDeleted ? {} : { deletedAt: null }),
      },
      orderBy: { updatedAt: "desc" },
    });
  });

// Export all procedures for use in router
export {
  getAssignmentById,
  getAssignmentsByClass as readAssignments,
  getDeletedAssignmentsByClass as readDeletedAssignments,
  getAssignmentsByFilter,
};
