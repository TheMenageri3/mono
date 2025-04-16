import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateClassroom = protectedProcedure
  .input(
    z.object({
      id: z.string(),
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
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingClassroom = await ctx.db.class.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existingClassroom.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Classroom already deleted",
      });
    }

    try {
      const classroom = await ctx.db.class.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return classroom;
    } catch (error) {
      console.error("Error updating classroom:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update classroom",
        cause: error,
      });
    }
  });
