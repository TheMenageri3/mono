import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateWorkHistorySchema } from "@/schemas";

export const updateWorkHistory = protectedProcedure
  .input(updateWorkHistorySchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existingWorkHistory = await ctx.db.workHistory.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existingWorkHistory.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Work history record not found",
      });
    }

    // Business logic: if isCurrent is true, endDate must be null/undefined
    if (
      input.isCurrent === true &&
      input.endDatetime !== undefined &&
      input.endDatetime !== null
    ) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "endDate must not be set if isCurrent is true",
      });
    }

    try {
      const workHistory = await ctx.db.workHistory.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });

      return workHistory;
    } catch (error) {
      console.error("Error updating work history:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update work history",
        cause: error,
      });
    }
  });
