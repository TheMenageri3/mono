import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteJobApplication = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const existingJobApplication = await ctx.db.jobApplication.findUnique({
      where: { id: input.id },
    });
    if (!existingJobApplication || existingJobApplication.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Job application not found",
      });
    }
    try {
      const jobApplication = await ctx.db.jobApplication.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
      return jobApplication;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete Job application",
        cause: error,
      });
    }
  });

export const restoreJobApplication = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const existingJobApplication = await ctx.db.jobApplication.findUnique({
      where: { id: input.id },
    });
    if (!existingJobApplication) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Job Application not found",
      });
    }
    if (existingJobApplication.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Job application is not deleted",
      });
    }
    try {
      const jobApplication = await ctx.db.jobApplication.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });

      return jobApplication;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore Job Application",
        cause: error,
      });
    }
  });
