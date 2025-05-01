import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createWorkHistorySchema } from "@/schemas";

export const createWorkHistory = protectedProcedure
  .input(createWorkHistorySchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;

    try {
      const workHistory = await ctx.db.workHistory.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });

      return workHistory;
    } catch (error) {
      console.error("Error creating work history:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create work history",
        cause: error,
      });
    }
  });
