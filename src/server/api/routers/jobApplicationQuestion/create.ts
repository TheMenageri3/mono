import { protectedProcedure } from "@/server/api/trpc";
import { createJobApplicationQuestionSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createJobApplicationQuestion = protectedProcedure
  .input(createJobApplicationQuestionSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      return await ctx.db.jobApplicationQuestion.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create job posting application question",
        cause: error,
      });
    }
  });
