import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateJobPosingSchema } from "./schema";

export const updateJobPosting = protectedProcedure
  .input(updateJobPosingSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;

    const existingJobPosting = await ctx.db.jobPosting.findUniqueOrThrow({
      where: { id: input.jobPostingId },
    });

    if (existingJobPosting.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Job posting not found",
      });
    }

    try {
      const jobPosting = await ctx.db.jobPosting.update({
        where: { id: input.jobPostingId },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return jobPosting;
    } catch (error) {
      console.error("Error updating job posting:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update job posting",
        cause: error,
      });
    }
  });
