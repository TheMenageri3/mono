import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readClasses = protectedProcedure.query(async ({ ctx }) => {
  try {
    const classes = await ctx.db.class.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return classes;
  } catch (error) {
    console.error("Error reading classes:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read classes",
      cause: error,
    });
  }
});

export const readDeletedClasses = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      const classes = await ctx.db.class.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return classes;
    } catch (error) {
      console.error("Error reading deleted classes:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted classes",
        cause: error,
      });
    }
  }
);

export const getClassById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      const class_ = await ctx.db.class.findUnique({
        where: {
          id: input.id,
        },
      });
      return class_;
    } catch (error) {
      console.error("Error getting class by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get class",
        cause: error,
      });
    }
  });

export const getClassesByData = protectedProcedure
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
      const classes = await ctx.db.class.findMany({
        where: {
          ...input,
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return classes;
    } catch (error) {
      console.error("Error getting classes by data:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get classes",
        cause: error,
      });
    }
  });
