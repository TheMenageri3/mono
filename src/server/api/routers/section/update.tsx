import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateSection = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      header: z.string().optional(),
      metadata: z.record(z.any()).optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx?.session?.user?.id;

    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not authenticated",
      });
    }

    const existing = await ctx.db.section.findUnique({
      where: { id: input.id },
    });

    if (!existing || existing.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Section not found",
      });
    }

    try {
      const section = await ctx.db.section.update({
        where: { id: input.id },
        data: {
          header: input.header,
          metadata: input.metadata,
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
