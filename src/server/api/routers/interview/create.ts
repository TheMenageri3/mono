import { protectedProcedure } from "@/server/api/trpc";
import { createInterviewSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createInterview = protectedProcedure
  .input(createInterviewSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const interview = await ctx.db.interview.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return interview;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create interview",
        cause: error,
      });
    }
  });
