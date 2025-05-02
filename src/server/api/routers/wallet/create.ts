import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createWalletSchema } from "@/schemas";

export const createWallet = protectedProcedure
  .input(createWalletSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existing = await ctx.db.wallet.findUnique({
      where: {
        publicKey: input.publicKey,
      },
    });
    if (existing) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Wallet already exists",
      });
    }
    try {
      const wallet = await ctx.db.wallet.create({
        data: {
          publicKey: input.publicKey,
          active: input.active,
          createdById: userId,
          updatedById: userId,
          profileId: input.profileId,
        },
      });
      return wallet;
    } catch (error) {
      console.error("Error creating wallet:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create wallet",
        cause: error,
      });
    }
  });
