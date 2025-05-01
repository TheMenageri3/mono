import { protectedProcedure } from "@/server/api/trpc";
import { updateSectionSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const updateSection = protectedProcedure
  .input(updateSectionSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.section.findUniqueOrThrow({
      where: { id: input.id },
    });

    if (existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Section already deleted",
      });
    }

    try {
      const section = await ctx.db.section.update({
        where: { id: input.id },
        data: {
          header: input.header,
          metadata: input.metadata,
          updatedById: userId,
        },
      });

      return section;
    } catch (error) {
      console.error("Error updating section:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update section",
        cause: error,
      });
    }
  });
