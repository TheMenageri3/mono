import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { deleteAssignmentSchema, restoreAssignmentSchema } from "@/schemas";

const deleteAssignment = protectedProcedure
  .input(deleteAssignmentSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existingAssignment = await ctx.db.assignment.findUniqueOrThrow({
      where: { id: input.id },
    });
    if (existingAssignment.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Assignment already deleted",
      });
    }
    try {
      return await ctx.db.assignment.update({
        where: { id: input.id },
        data: { deletedAt: new Date(), updatedById: userId },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete assignment",
        cause: error,
      });
    }
  });

const restoreAssignment = protectedProcedure
  .input(restoreAssignmentSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existingAssignment = await ctx.db.assignment.findUniqueOrThrow({
      where: { id: input.id },
    });
    if (existingAssignment.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Assignment is not deleted",
      });
    }
    try {
      return await ctx.db.assignment.update({
        where: { id: input.id },
        data: { deletedAt: null, updatedById: userId },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore assignment",
        cause: error,
      });
    }
  });

export { deleteAssignment, restoreAssignment };
