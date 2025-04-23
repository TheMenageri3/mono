import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateJobPostingApplicationQuestion = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      order: z.number().optional(),
      required: z.boolean().optional(),
      points: z.number().optional(),
      section: z.string().nullable().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.jobApplicationQuestion.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existing.deletedAt !== null) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Record not found" });
      }

      return await ctx.db.jobApplicationQuestion.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update job posting application question",
        cause: error,
      });
    }
  });


