import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createClassApplicationAnswer = protectedProcedure
  .input(
    z.object({
      questionId: z.string(),
      classApplicationQuestionId: z.string(),
      answerId: z.string().optional(),
      classApplicationResponseId: z.string().optional(),
    })
  )
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
