import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/api/trpc";
import { deleteAnswerSchema, restoreAnswerSchema } from "@/schemas";

const deleteAnswer = protectedProcedure
  .input(deleteAnswerSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      const answer = await ctx.db.answer.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (answer.deletedAt !== null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Answer with ID ${input.id} is already deleted.`,
        });
      }

      return await ctx.db.answer.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to delete answer with ID ${input.id}.`,
        cause: error,
      });
    }
  });

const restoreAnswer = protectedProcedure
  .input(restoreAnswerSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      const answer = await ctx.db.answer.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (answer.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Answer with ID ${input.id} is not deleted.`,
        });
      }

      return await ctx.db.answer.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to restore answer with ID ${input.id}.`,
        cause: error,
      });
    }
  });

export { deleteAnswer, restoreAnswer };
