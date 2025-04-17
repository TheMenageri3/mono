import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readWorkHistory = protectedProcedure.query(async ({ ctx }) => {
  try {
    const workHistory = await ctx.db.workHistory.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        profile: true,
        company: true,
        skills: {
            include: {
              endorsedBy: true,
            },
        },
      },
    });
    return workHistory;
  } catch (error) {
    console.error("Error reading work history:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read work history",
      cause: error,
    });
  }
});

export const readDeletedWorkHistory = protectedProcedure.query(async ({ ctx }) => {
  try {
    const workHistory = await ctx.db.workHistory.findMany({
      where: {
        deletedAt: {
          not: null,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        profile: true,
        company: true,
        skills: {
            include: {
              endorsedBy: true,
            },
        },
      },
    });
    return workHistory;
  } catch (error) {
    console.error("Error reading deleted work history:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read deleted work history",
      cause: error,
    });
  }
});

export const getWorkHistoryById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      const workHistory = await ctx.db.workHistory.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        include: {
          profile: true,
          company: true,
          skills: {
            include: {
              endorsedBy: true,
            },
          },
        },
      });


      if (workHistory.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Work history is soft-deleted",
        });
      }

      return workHistory;
    } catch (error) {
      console.error("Error getting work history by ID:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get work history",
        cause: error,
      });
    }
  });

