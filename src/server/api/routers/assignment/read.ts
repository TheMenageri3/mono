import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  getAssignmentByIdSchema,
  getAssignmentsByClassSchema,
  getDeletedAssignmentsByClassSchema,
  getAssignmentsByFilterSchema,
} from "@/schemas";

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

const getAssignmentsByClass = protectedProcedure
  .input(getAssignmentsByClassSchema)
  .query(async ({ ctx, input }) => {
    return await ctx.db.assignment.findMany({
      where: { classId: input.classId, deletedAt: null },
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
      where: { classId: input.classId, deletedAt: { not: null } },
      orderBy: { updatedAt: "desc" },
      take: input.limit,
      skip: input.offset,
    });
  });

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

export {
  getAssignmentById,
  getAssignmentsByClass as readAssignments,
  getDeletedAssignmentsByClass as readDeletedAssignments,
  getAssignmentsByFilter,
};
