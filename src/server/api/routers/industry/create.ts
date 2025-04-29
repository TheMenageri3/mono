import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createIndustrySchema } from "@/schemas";

export const createIndustry = protectedProcedure
  .input(createIndustrySchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      return await ctx.db.industry.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create industry",
        cause: error,
      });
    }
  });
