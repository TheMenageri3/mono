import { protectedProcedure } from "../../trpc";
import { updateJobApplicationSchema } from "./schema";

export const updateJobApplication = protectedProcedure
  .input(updateJobApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;

    const existingJobApplication = await ctx.db.jobApplication.findUniqueOrThrow({
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
    } catch (error: unknown) {
      throw error;
    }
  });
