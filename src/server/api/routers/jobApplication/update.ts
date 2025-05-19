import { protectedProcedure } from "@/server/api/trpc";
import { updateJobApplicationSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateJobApplication = protectedProcedure
  .input(updateJobApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;

    const existingJobApplication =
      await ctx.db.jobApplication.findUniqueOrThrow({
        where: { id: input.jobApplicationId },
      });

    try {
      const updatedJobApplication = await ctx.db.jobApplication.update({
        where: { id: existingJobApplication.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return updatedJobApplication;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get update job applications",
        cause: error,
      });
    }
  });
