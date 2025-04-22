import { protectedProcedure } from "@/server/api/trpc";
import { any, z } from "zod";
import { TRPCError } from "@trpc/server";

export const createSection = protectedProcedure
  .input(
    z.object({
      header: z.string(),
      metadata: z.record(z.any()),
    })
  )
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
