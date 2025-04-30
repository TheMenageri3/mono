import { protectedProcedure } from "@/server/api/trpc";
import { updateEnrollmentSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateEnrollment = protectedProcedure
  .input(updateEnrollmentSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const existing = await ctx.db.enrollment.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Enrollment has been deleted.",
      });
    }

    try {
      return await ctx.db.enrollment.update({
        where: { id: input.id },
        data: {
          ...input.data,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update enrollment.",
        cause: error,
      });
    }
  });
