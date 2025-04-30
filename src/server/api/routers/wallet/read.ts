import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  readWalletsSchema,
  readDeletedWalletsSchema,
  getWalletByPublicKeySchema,
} from "@/schemas";

export const readWallets = protectedProcedure
  .input(readWalletsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const wallets = await ctx.db.wallet.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
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

export const readDeletedWallets = protectedProcedure
  .input(readDeletedWalletsSchema)
  .query(async ({ ctx, input }) => {
    try {
      const wallets = await ctx.db.wallet.findMany({
        where: {
          deletedAt: { not: null },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
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
  .input(getWalletByPublicKeySchema)
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
