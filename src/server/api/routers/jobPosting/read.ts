import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  getJobPostingByIdSchema,
  readJobPostingsSchema,
  readDeletedJobPostingsSchema,
} from "@/schemas";

export const getJobPostingById = publicProcedure
  .input(getJobPostingByIdSchema)
  .query(async ({ ctx, input }) => {
    const jobPosting = await ctx.db.jobPosting.findFirstOrThrow({
      where: {
        id: input.id,
      },
    });
    return jobPosting;
  });

export const readJobPostings = publicProcedure
  .input(readJobPostingsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const jobPostings = await ctx.db.jobPosting.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
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

export const readDeletedJobPosting = publicProcedure
  .input(readDeletedJobPostingsSchema)
  .query(async ({ ctx, input }) => {
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
        take: input.limit,
        skip: input.offset,
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
