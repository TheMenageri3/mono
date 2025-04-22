import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readWallets = protectedProcedure.query(async ({ ctx }) => {
  try {
    const wallets = await ctx.db.wallet.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return wallets;
  } catch (error) {
    console.error("Error reading wallets:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read wallets",
      cause: error,
    });
  }
});

export const readDeletedWallets = protectedProcedure.query(async ({ ctx }) => {
  try {
    const wallets = await ctx.db.wallet.findMany({
      where: {
        deletedAt: { not: null },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return wallets;
  } catch (error) {
    console.error("Error reading wallets:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to read deleted wallets",
      cause: error,
    });
  }
});

export const getWalletByPublicKey = protectedProcedure
  .input(z.object({ publicKey: z.string() }))
  .query(async ({ ctx, input }) => {
    try {
      const wallet = await ctx.db.wallet.findUnique({
        where: {
          publicKey: input.publicKey,
          deletedAt: null,
        },
      });
      return wallet;
    } catch (error) {
      console.error("Error getting wallet by PublicKey:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get wallet",
        cause: error,
      });
    }
  });
