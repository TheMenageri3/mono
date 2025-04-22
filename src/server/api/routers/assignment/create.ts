import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "@/server/api/trpc";
import { AssignmentType, AssignmentStatus, SubmissionType } from "@/generated/prisma/client";

const createAssignment = protectedProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
      type: z.nativeEnum(AssignmentType),
      status: z.nativeEnum(AssignmentStatus),
      submissionType: z.nativeEnum(SubmissionType),
      submissionInstructions: z.string(),
      pointsPossible: z.number().optional(),
      gradingRubric: z.object({}).optional(),
      releaseDate: z.string().datetime().optional(),
      dueDate: z.string().datetime().optional(),
      allowLateSubmissions: z.boolean().optional(),
      latePenalty: z.object({}).optional(),
      classId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;

      return await ctx.db.assignment.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create assignment.",
        cause: error,
      });
    }
  });

export {
  createAssignment
}
