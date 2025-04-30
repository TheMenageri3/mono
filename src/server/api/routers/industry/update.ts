import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateIndustrySchema } from "@/schemas";

export const updateIndustry = protectedProcedure
  .input(updateIndustrySchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      const existing = await ctx.db.industry.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existing.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Industry not found",
        });
      }

      return await ctx.db.industry.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          parentIndustryId: input.parentIndustryId,
          updatedById: userId,
        },
      });
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update industry",
      });
    }
  });
