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
        type: z
          .enum(["INDIVIDUAL", "GROUP", "EXAM", "PROJECT", "PREREQUISITE"])
          .optional(),
        status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
        submissionType: z
          .enum(["TEXT", "FILE", "LINK", "CODE", "MIXED"])
          .optional(),
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
    const userId = ctx.session.user.id;

    //Check if assignment exists and is not deleted
    const assignment = await ctx.db.assignment.findUnique({
      where: { id: input.id },
    });

    if (!assignment || assignment.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Assignment not found or has been deleted",
      });
    }

    try {
      return await ctx.db.assignment.update({
        where: { id: input.id },
        data: {
          ...input.data,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to update assignment with ID ${input.id}.`,
        cause: error,
      });
    }
  });
