import { protectedProcedure } from "@/server/api/trpc";
import {
  readInterviewsSchema,
  readDeletedInterviewsSchema,
  getInterviewByIdSchema,
  getInterviewByDataSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const readInterviews = protectedProcedure
  .input(readInterviewsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const interviews = await ctx.db.interview.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return interviews;
    } catch (error) {
      console.error("Error reading interviews:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read interviews",
        cause: error,
      });
    }
  });

export const readDeletedInterviews = protectedProcedure
  .input(readDeletedInterviewsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const interviews = await ctx.db.interview.findMany({
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
      return interviews;
    } catch (error) {
      console.error("Error reading deleted interviews:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted interviews",
        cause: error,
      });
    }
  });

export const getInterviewById = protectedProcedure
  .input(getInterviewByIdSchema)
  .query(async ({ ctx, input }) => {
    try {
      const interview = await ctx.db.interview.findUnique({
        where: {
          id: input.id,
        },
      });
      return interview;
    } catch (error) {
      console.error("Error getting interview by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get interview",
        cause: error,
      });
    }
  });

export const getInterviewByData = protectedProcedure
  .input(getInterviewByDataSchema)
  .query(async ({ ctx, input }) => {
    try {
      const interview = await ctx.db.interview.findMany({
        where: {
          ...input,
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return interview;
    } catch (error) {
      console.error("Error getting interview by data:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get interview",
        cause: error,
      });
    }
  });
