import { protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const acceptApplication = protectedProcedure
  .input(z.object({ applicationId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.$transaction(async (db) => {
      const application = await db.bountyApplication.findUnique({
        where: {
          id: input.applicationId,
        },
      });

      const hasAcceptedApplication = await db.bountyApplication.findFirst({
        where: {
          bountyId: application?.bountyId,
          status: "ACCEPTED",
        },
      });

      if (hasAcceptedApplication) {
        throw new Error(
          "Submitter already exists. Good luck with other bounties",
        );
      }

      return await ctx.db.bountyApplication.update({
        where: { id: input.applicationId },
        data: { status: "ACCEPTED" },
      });
    });
  });

export const rejectApplication = protectedProcedure
  .input(z.object({ applicationId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.bountyApplication.update({
      where: { id: input.applicationId },
      data: { status: "REJECTED" },
    });
  });

export const startBounty = protectedProcedure
  .input(z.object({ bountyId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.bounty.update({
      where: { id: input.bountyId },
      data: { status: "IN_PROGRESS" },
    });
  });

export const endBounty = protectedProcedure
  .input(z.object({ bountyId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.bounty.update({
      where: { id: input.bountyId },
      data: { status: "COMPLETED" },
    });
  });
