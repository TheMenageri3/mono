import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteJobPosting = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingJobPosting = await ctx.db.jobPosting.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existingJobPosting.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Job Posting not found",
      });
    }

    try {
      const jobPosting = await ctx.db.jobPosting.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });

      return jobPosting;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete job posting",
        cause: error,
      });
    }
  });

export const restoreJobPosting = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const existingJobPosting = await ctx.db.jobPosting.findUnique({
      where: { id: input.id },
    });

    if (!existingJobPosting) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Job posting not found",
      });
    }

    if (existingJobPosting.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Job posting is not deleted",
      });
    }
    
    try {
      const jobPosting = await ctx.db.jobPosting.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });

      return jobPosting;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore job posting",
        cause: error,
      });
    }
  });
