import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateWallet = protectedProcedure
  .input(
    z.object({
      publicKey: z.string(),
      active: z.boolean(),
      profileId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existingWallet = await ctx.db.wallet.findUnique({
      where: { publicKey: input.publicKey },
    });
    if (!existingWallet || existingWallet.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Wallet not found",
      });
    }
    try {
      const wallet = await ctx.db.wallet.update({
        where: {
          publicKey: input.publicKey,
        },
        data: {
          active: input.active,
          profileId: input.profileId,
          updatedById: userId,
        },
      });
      return wallet;
    } catch (error) {
      console.error("Error updating wallet:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update wallet",
        cause: error,
      });
    }
  });
