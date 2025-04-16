import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const getJobPostingById = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const jobPosting = await ctx.db.jobPosting.findFirst({
      where: {
        id: input.id,
      },
    });
    return jobPosting;
  });

export const readJobPostings = publicProcedure.query(async ({ ctx }) => {
  try {
    const jobPostings = await ctx.db.jobPosting.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return jobPostings;
  } catch (error) {
    console.error("Error reading job posting:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read job posting",
      cause: error,
    });
  }
});

export const readDeletedJobPosting = publicProcedure.query(async ({ ctx }) => {
  try {
    const jobPosting = await ctx.db.jobPosting.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return jobPosting;
  } catch (error) {
    console.error("Error reading deleted job posting:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read deleted job posting",
      cause: error,
    });
  }
});
