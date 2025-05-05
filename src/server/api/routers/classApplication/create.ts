import { TRPCError } from "@trpc/server";
import { createClassApplicationSchema } from "@/schemas";
import { protectedProcedure } from "@/server/api/trpc";

export const createClassApplication = protectedProcedure
  .input(createClassApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const classApplication = await ctx.db.classApplication.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return classApplication;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create classApplication",
        cause: error,
      });
    }
  });
