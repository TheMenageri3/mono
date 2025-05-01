import { protectedProcedure } from "@/server/api/trpc";
import { updateInterviewSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateInterview = protectedProcedure
  .input(updateInterviewSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingInterview = await ctx.db.interview.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existingInterview.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Interview already deleted",
      });
    }

    try {
      const interview = await ctx.db.interview.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return interview;
    } catch (error) {
      console.error("Error updating interview:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update interview",
        cause: error,
      });
    }
  });
