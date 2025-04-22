import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createIndustry = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      description: z.string(),
      parentIndustryId: z.string().optional(),
    })
  )
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
