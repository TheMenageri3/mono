import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

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
    return ctx.db.industry.create({
      data: {
        name: input.name,
        description: input.description,
        parentIndustryId: input.parentIndustryId,
        createdById: userId,
        updatedById: userId,
      },
    });
  });
