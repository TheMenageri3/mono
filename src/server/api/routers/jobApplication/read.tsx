import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const getJobApplicationById = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const jobApplication = await ctx.db.jobApplication.findFirst({
      where: {
        id: input.id,
      },
    });
    return jobApplication;
  });

export const readAllJobApplications = publicProcedure.query(async ({ ctx }) => {
  try {
    const jobApplications = await ctx.db.jobApplication.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
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

export const readDeletedJobApplications = publicProcedure.query(
  async ({ ctx }) => {
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
  }
);
