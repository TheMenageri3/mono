import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateJobApplicationQuestionSchema } from "@/schemas";

export const updateJobApplicationQuestion = protectedProcedure
  .input(updateJobApplicationQuestionSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.jobApplicationQuestion.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existing.deletedAt !== null) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Record not found" });
      }

      return await ctx.db.jobApplicationQuestion.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update job posting application question",
        cause: error,
      });
    }
  });
