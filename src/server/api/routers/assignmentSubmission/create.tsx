import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { SubmissionStatus } from "@/generated/prisma/client";

export const createAssignmentSubmission = protectedProcedure
  .input(
    z.object({
      status: z.nativeEnum(SubmissionStatus),
      submissionText: z.string().optional(),
      submissionUrl: z.string().optional(),
      submittedAt: z.string().datetime().optional(),
      gradedAt: z.string().datetime().optional(),
      score: z.number().optional(),
      feedback: z.string().optional(),
      gradedById: z.string().optional(),
      submitterId: z.string().optional(),
      assignmentId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      return await ctx.db.assignmentSubmission.create({
        data: {
          ...input,
          submittedAt: input.submittedAt ? new Date(input.submittedAt) : undefined,
          gradedAt: input.gradedAt ? new Date(input.gradedAt) : undefined,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create assignment submission.",
        cause: error,
      });
    }
  });
