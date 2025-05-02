import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { QuarterType, StatusType } from "@/generated/prisma/client";

export const updateClass = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      shortDescription: z.string().optional(),
      year: z.number().optional(),
      quarter: z.nativeEnum(QuarterType).optional(),
      status: z.nativeEnum(StatusType).optional(),
      startDatetime: z.string().datetime().optional(),
      endDatetime: z.string().datetime().optional(),
      enrollmentCapacity: z.number().optional(),
      syllabusUrl: z.string().url().optional(),
      meetingSchedule: z.any().optional(),
      location: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    const existingClass = await ctx.db.class.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existingClass.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Class already deleted",
      });
    }

    try {
      const class_ = await ctx.db.class.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
          updatedById: userId,
        },
      });
      return class_;
    } catch (error) {
      console.error("Error updating class:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update class",
        cause: error,
      });
    }
  });
