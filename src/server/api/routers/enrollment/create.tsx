import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";


export const createEnrollment = protectedProcedure
  .input(
    z.object({
      status: z.enum(["ENROLLED","WAITLISTED","DROPPED","COMPLETED"]),
      enrollmentDate: z.string().datetime().optional(),
      completionDate: z.string().datetime().optional(),
      finalGrade: z.number().optional(),
      studentId: z.string(),
      classId: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      return await ctx.db.enrollment.create({
        data: {
          ...input,
          enrollmentDate: input.enrollmentDate ? new Date(input.enrollmentDate) : undefined,
          completionDate: input.completionDate ? new Date(input.completionDate) : undefined,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create enrollment.",
        cause: error,
      });
    }
  });
