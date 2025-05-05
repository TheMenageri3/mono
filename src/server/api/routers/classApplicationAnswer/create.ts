import { protectedProcedure } from "@/server/api/trpc";
import { createClassApplicationAnswerSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createClassApplicationAnswer = protectedProcedure
  .input(createClassApplicationAnswerSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      return await ctx.db.classApplicationAnswer.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create class application answer",
      });
    }
  });
