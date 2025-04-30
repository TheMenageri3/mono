import { protectedProcedure } from "@/server/api/trpc";
import { createClassApplicationQuestionSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createClassApplicationQuestion = protectedProcedure
  .input(createClassApplicationQuestionSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      return await ctx.db.classApplicationQuestion.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create class application question",
        cause: error,
      });
    }
  });
