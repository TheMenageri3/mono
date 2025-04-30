import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  getWorkHistoryByIdSchema,
  readWorkHistorySchema,
  readDeletedWorkHistorySchema,
} from "@/schemas";

export const readWorkHistory = protectedProcedure
  .input(readWorkHistorySchema)
  .query(async ({ ctx, input }) => {
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
        take: input.limit,
        skip: input.offset,
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

export const readDeletedWorkHistory = protectedProcedure
  .input(readDeletedWorkHistorySchema)
  .query(async ({ ctx, input }) => {
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
        take: input.limit,
        skip: input.offset,
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
  .input(getWorkHistoryByIdSchema)
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
