import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { SubmissionStatus } from "@/generated/prisma/client";

export const updateAssignmentSubmission = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      data: z.object({
        status: z.nativeEnum(SubmissionStatus).optional(),
        submissionText: z.string().optional(),
        submissionUrl: z.string().optional(),
        gradedAt: z.string().datetime().optional(),
        score: z.number().optional(),
        feedback: z.string().optional(),
        gradedById: z.string().optional(),
      }),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existing = await ctx.db.assignmentSubmission.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Submission has been deleted.",
      });
    }

    try {
      return await ctx.db.assignmentSubmission.update({
        where: { id: input.id },
        data: {
          ...input.data,
          gradedAt: input.data.gradedAt ? new Date(input.data.gradedAt) : undefined,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update submission.",
        cause: error,
      });
    }
  });
