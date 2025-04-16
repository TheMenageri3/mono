import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readClassrooms = protectedProcedure.query(async ({ ctx }) => {
  try {
    const classrooms = await ctx.db.class.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return classrooms;
  } catch (error) {
    console.error("Error reading classrooms:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read classrooms",
      cause: error,
    });
  }
});

export const readDeletedClassrooms = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      const classrooms = await ctx.db.class.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return classrooms;
    } catch (error) {
      console.error("Error reading deleted classrooms:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted classrooms",
        cause: error,
      });
    }
  }
);

export const getClassroomById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      const classroom = await ctx.db.class.findUnique({
        where: {
          id: input.id,
        },
      });
      return classroom;
    } catch (error) {
      console.error("Error getting classroom by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get classroom",
        cause: error,
      });
    }
  });

export const getClassroomByData = protectedProcedure
  .input(
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      shortDescription: z.string().optional(),
      year: z.number().optional(),
      quarter: z.enum(["FALL", "WINTER", "SUMMER", "SPRING"]).optional(),
      status: z
        .enum(["UPCOMING", "ACTIVE", "COMPLETED", "CANCELLED"])
        .optional(),
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      enrollmentCapacity: z.number().optional(),
      syllabusUrl: z.string().url().optional(),
      meetingSchedule: z.any().optional(),
      location: z.string().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    try {
      const classroom = await ctx.db.class.findMany({
        where: {
          ...input,
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return classroom;
    } catch (error) {
      console.error("Error getting classroom by data:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get classrooms",
        cause: error,
      });
    }
  });
