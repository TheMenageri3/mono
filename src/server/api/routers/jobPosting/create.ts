import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createJobPostingSchema } from "@/schemas";

export const createJobPosting = protectedProcedure
  .input(createJobPostingSchema)
  .mutation(async ({ ctx, input }) => {
    const { industryIds = [], ...jobData } = input;

    const userId = ctx.session?.user?.id;

    try {
      await ctx.db.$transaction(async (tx) => {
        const jobPosting = await tx.jobPosting.create({
          data: {
            ...jobData,
            createdById: userId,
            updatedById: userId,
            postedDate: jobData.postedDate || new Date(),
          },
        });

        if (industryIds.length > 0) {
          const industryEntries = industryIds.map((industryId) => ({
            jobPostingId: jobPosting.id,
            industryId,
            createdById: userId,
            updatedById: userId,
          }));

          await tx.jobPostingIndustry.createMany({
            data: industryEntries,
          });
        }

        return jobPosting;
      });
    } catch (error) {
      console.error("Error creating job posting:", error);
      if (error instanceof TRPCError) {
        throw error;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create job posting",
        cause: error,
      });
    }
  });
