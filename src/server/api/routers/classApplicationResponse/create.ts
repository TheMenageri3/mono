import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createClassApplicationResponseSchema } from "@/schemas";

const createClassApplicationResponse = protectedProcedure
  .input(createClassApplicationResponseSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const classApplicationResponse =
        await ctx.db.classApplicationResponse.create({
          data: {
            ...input,
            submittedAt: input.submittedAt
              ? new Date(input.submittedAt)
              : undefined,
            reviewedAt: input.reviewedAt
              ? new Date(input.reviewedAt)
              : undefined,
            createdById: userId,
            updatedById: userId,
          },
        });
      return classApplicationResponse;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create classApplicationResponse.",
        cause: error,
      });
    }
  });

export { createClassApplicationResponse };
