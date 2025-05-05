import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { updateQuestionsSchema } from "@/schemas";

const updateQuestion = protectedProcedure
  .input(updateQuestionsSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    let question;
    try {
      question = await ctx.db.question.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (question.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Question with ID ${input.id} has been deleted.`,
        });
      }

      return await ctx.db.question.update({
        where: { id: input.id },
        data: {
          ...input.data,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to update question with ID ${input.id}.`,
        cause: error,
      });
    }
  });

export { updateQuestion };
