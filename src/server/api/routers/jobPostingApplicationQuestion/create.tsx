import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createJobPostingApplicationQuestion = protectedProcedure
  .input(
    z.object({
      order: z.number(),
      required: z.boolean(),
      points: z.number(),
      section: z.string().nullable().optional(),
      jobApplicationId: z.string(),
      questionId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      return await ctx.db.jobApplicationQuestion.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create job posting application question",
        cause: error,
      });
    }
  });


