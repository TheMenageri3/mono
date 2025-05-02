import { protectedProcedure } from "@/server/api/trpc";
import { createSectionSchema } from "@/schemas";
import { TRPCError } from "@trpc/server";

export const createSection = protectedProcedure
  .input(createSectionSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const section = await ctx.db.section.create({
        data: {
          header: input.header,
          metadata: input.metadata,
          createdById: userId,
          updatedById: userId,
        },
      });
      return section;
    } catch (error) {
      console.error("Error creating section:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create section",
        cause: error,
      });
    }
  });
