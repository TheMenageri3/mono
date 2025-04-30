import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  getJobApplicationByIdSchema,
  readAllJobApplicationsSchema,
  readDeletedJobApplicationsSchema,
} from "@/schemas";

export const getJobApplicationById = publicProcedure
  .input(getJobApplicationByIdSchema)
  .query(async ({ ctx, input }) => {
    const jobApplication = await ctx.db.jobApplication.findFirstOrThrow({
      where: {
        id: input.id,
      },
    });
    return jobApplication;
  });

export const readAllJobApplications = publicProcedure
  .input(readAllJobApplicationsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const jobApplications = await ctx.db.jobApplication.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return jobApplications;
    } catch (error) {
      console.error("Error getting job applications:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get job applications",
        cause: error,
      });
    }
  });

export const readDeletedJobApplications = publicProcedure
  .input(readDeletedJobApplicationsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const jobApplications = await ctx.db.jobApplication.findMany({
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
      return jobApplications;
    } catch (error) {
      console.error("Error getting deleted job applications:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get deleted job applications",
        cause: error,
      });
    }
  });
