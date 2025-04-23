import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const getEnrollmentById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      return await ctx.db.enrollment.findUniqueOrThrow({
        where: {
          id: input.id,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Enrollment with ID ${input.id} not found.`,
        cause: error,
      });
    }
  });

export const readEnrollments = protectedProcedure.query(async ({ ctx }) => {
  return await ctx.db.enrollment.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
});
