import { protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const createCampaign = protectedProcedure
  .input(z.object({
    title: z.string(),
    description: z.string(),
    goal: z.number().int().positive(),
    ends: z.date(),
    publicKey: z.string(),
    seed: z.string(),
  }))
  .mutation(async ({ ctx, input }) => {
    const { title, description, goal, ends, publicKey, seed } = input;
    const { user } = ctx.session;

    // Create Campaign
    const campaign = await ctx.db.campaign.create({
      data: {
        title,
        description,
        goal,
        ends,
        publicKey,
        seed,
        current: 0,
        creator: { connect: { id: user.id } },
      },
    });

    return campaign;
  });