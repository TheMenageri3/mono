import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { baseJobPostingSchema } from "./schema";

export const createJobPosting = protectedProcedure
  .input(baseJobPostingSchema)
  .mutation(async ({ ctx, input }) => {
    
    const userId = ctx.session?.user?.id;

    try {
      const jobPosting = await ctx.db.jobPosting.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });

      return jobPosting;
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
