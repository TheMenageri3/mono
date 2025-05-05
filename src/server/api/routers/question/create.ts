import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { createQuestionSchema } from "@/schemas";

const createQuestion = protectedProcedure
  .input(createQuestionSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const question = await ctx.db.question.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return question;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create question",
        cause: error,
      });
    }
  });

export { createQuestion };
