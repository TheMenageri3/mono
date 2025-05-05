import { protectedProcedure } from "@/server/api/trpc";
import {
  deleteJobApplicationSchema,
  restoreJobApplicationSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const deleteJobApplication = protectedProcedure
  .input(deleteJobApplicationSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const existingJobApplication =
      await ctx.db.jobApplication.findUniqueOrThrow({
        where: { id: input.id },
      });

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
  .input(restoreJobApplicationSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const existingJobApplication =
      await ctx.db.jobApplication.findUniqueOrThrow({
        where: { id: input.id },
      });

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
