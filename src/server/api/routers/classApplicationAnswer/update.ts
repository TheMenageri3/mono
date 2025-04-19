import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateClassApplicationAnswer = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      questionId: z.string().optional(),
      classApplicationQuestionId: z.string().optional(),
      answerId: z.string().optional(),
      classApplicationResponseId: z.string().optional(),
    })
  )
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
