import { z } from "zod";
import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const updateAssignment = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      data: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        type: z.enum(["INDIVIDUAL", "GROUP", "EXAM", "PROJECT", "PREREQUISITE"]).optional(),
        status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
        submissionType: z.enum(["TEXT", "FILE", "LINK", "CODE", "MIXED"]).optional(),
        submissionInstructions: z.string().optional(),
        pointsPossible: z.number().optional(),
        gradingRubric: z.object({}).optional(),
        releaseDate: z.date().optional(),
        dueDate: z.date().optional(),
        allowLateSubmissions: z.boolean().optional(),
        latePenalty: z.object({}).optional(),
      }),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;

      return await ctx.db.assignment.update({
        where: { id: input.id },
        data: {
          ...input.data,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Assignment with ID ${input.id} could not be updated.`,
        cause: error,
      });
    }
  });
