import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createJobApplicationSchema } from "./schema";



export const createJobApplication = protectedProcedure
  .input(createJobApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;

    const existingJobPositing = await ctx.db.jobPosting.findUniqueOrThrow({
      where: {
        id: input.jobPostingId
      },
    });

    if (!existingJobPositing) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Job posting not found.",
      });
    }
    try {
      const jobApplication = await ctx.db.jobApplication.create({
        data: {
          ...input,
          jobPostingId: existingJobPositing.id,
          createdById: userId,
          applicantId: userId,
          updatedById: userId,
        },
      });
      return jobApplication;
    } catch (error) {
      console.error("Error creating job application:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create Job application",
        cause: error,
      });
    }
  });
