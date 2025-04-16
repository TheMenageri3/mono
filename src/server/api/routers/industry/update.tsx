import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateIndustry = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
      parentIndustryId: z.string().optional().nullable(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.industry.findUnique({
      where: { id: input.id },
    });

    if (!existing || existing.deletedAt !== null) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Industry not found" });
    }

    return ctx.db.industry.update({
      where: { id: input.id },
      data: {
        name: input.name,
        description: input.description,
        parentIndustryId: input.parentIndustryId,
        updatedById: userId,
      },
    });
  });
