import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { createAnswerSchema } from "@/schemas";

const createAnswer = protectedProcedure
  .input(createAnswerSchema)
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const answer = await ctx.db.answer.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return answer;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create answer",
        cause: error,
      });
    }
  });

export { createAnswer };
