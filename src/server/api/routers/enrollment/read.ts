import { protectedProcedure } from "@/server/api/trpc";
import { getEnrollmentByIdSchema, readEnrollmentsSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const getEnrollmentById = protectedProcedure
  .input(getEnrollmentByIdSchema)
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

export const readEnrollments = protectedProcedure
  .input(readEnrollmentsSchema)
  .query(async ({ ctx, input }) => {
    return await ctx.db.enrollment.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: input.limit,
      skip: input.offset,
    });
  });
