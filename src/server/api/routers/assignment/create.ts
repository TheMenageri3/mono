import { TRPCError } from "@trpc/server";
import { createAssignmentSchema } from "@/schemas";
import { protectedProcedure } from "@/server/api/trpc";

const createAssignment = protectedProcedure
  .input(createAssignmentSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      return await ctx.db.assignment.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create assignment.",
        cause: error,
      });
    }
  });

export { createAssignment };
