import { protectedProcedure } from "@/server/api/trpc";
import { updateClassApplicationAnswerSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateClassApplicationAnswer = protectedProcedure
  .input(updateClassApplicationAnswerSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      return await ctx.db.classApplicationAnswer.update({
        where: { id: input.id },
        data: { ...input, updatedById: userId },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update class application answer",
      });
    }
  });
