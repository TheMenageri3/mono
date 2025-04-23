import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateJobPosingSchema } from "./schema";

export const updateJobPosting = protectedProcedure
  .input(updateJobPosingSchema)
  .mutation(async ({ input, ctx }) => {
    const { jobPostingId, industryIds, ...updateFields } = input;

    const userId = ctx.session.user.id;

    const existingJobPosting = await ctx.db.jobPosting.findUniqueOrThrow({
      where: { id: jobPostingId },
    });

    if (existingJobPosting.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Job posting not found",
      });
    }

    try {
      await ctx.db.$transaction(async (tx) => {
        // Update JobPosting fields
        const updatedJobPosting = await tx.jobPosting.update({
          where: { id: existingJobPosting.id },
          data: {
            ...updateFields,
            updatedById: userId,
          },
        });

        // If industries are provided, sync them
        if (industryIds) {
          // Delete old associations
          await tx.jobPostingIndustry.deleteMany({
            where: { jobPostingId: existingJobPosting.id },
          });

          // Add new associations
          const newIndustryLinks = industryIds.map((industryId) => ({
            jobPostingId: existingJobPosting.id,
            industryId,
            createdById: userId,
            updatedById: userId,
          }));

          await tx.jobPostingIndustry.createMany({
            data: newIndustryLinks,
          });
        }

        return updatedJobPosting;
      });
    } catch (error) {
      console.error("Error updating job posting:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update job posting",
        cause: error,
      });
    }
  });
