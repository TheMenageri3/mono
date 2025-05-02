import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateAssignmentSchema } from "@/schemas";

const updateAssignment = protectedProcedure
  .input(updateAssignmentSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    let assignment;
    try {
      assignment = await ctx.db.assignment.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (assignment.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Assignment with ID ${input.id} has been deleted.`,
        });
      }
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Assignment with ID ${input.id} was not found.`,
        cause: error,
      });
    }

    try {
      return await ctx.db.assignment.update({
        where: { id: input.id },
        data: { ...input.data, updatedById: userId },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to update assignment with ID ${input.id}.`,
        cause: error,
      });
    }
  });

export { updateAssignment };
