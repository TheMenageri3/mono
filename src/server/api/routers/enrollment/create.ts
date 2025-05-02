import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createEnrollemntSchema } from "@/schemas";

export const createEnrollment = protectedProcedure
  .input(createEnrollemntSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      return await ctx.db.enrollment.create({
        data: {
          ...input,
          enrollmentDate: input.enrollmentDate
            ? new Date(input.enrollmentDate)
            : undefined,
          completionDate: input.completionDate
            ? new Date(input.completionDate)
            : undefined,
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
