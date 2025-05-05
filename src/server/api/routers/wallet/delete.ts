import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { deleteWalletSchema, restoreWalletSchema } from "@/schemas";

export const deleteWallet = protectedProcedure
  .input(deleteWalletSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existingWallet = await ctx.db.wallet.findUniqueOrThrow({
      where: { publicKey: input.publicKey },
    });
    if (existingWallet.deletedAt !== null) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Wallet already deleted",
      });
    }
    try {
      const wallet = await ctx.db.wallet.update({
        where: {
          publicKey: input.publicKey,
        },
        data: {
          active: false,
          updatedById: userId,
          deletedAt: new Date(),
        },
      });
      return wallet;
    } catch (error) {
      console.error("Error deleting wallet:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete wallet",
        cause: error,
      });
    }
  });

export const restoreWallet = protectedProcedure
  .input(restoreWalletSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const existingWallet = await ctx.db.wallet.findUniqueOrThrow({
      where: { publicKey: input.publicKey },
    });
    if (existingWallet.deletedAt === null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Wallet is already active",
      });
    }
    try {
      const wallet = await ctx.db.wallet.update({
        where: {
          publicKey: input.publicKey,
        },
        data: {
          active: true,
          updatedById: userId,
          deletedAt: null,
        },
      });
      return wallet;
    } catch (error) {
      console.error("Error restoring wallet:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore wallet",
        cause: error,
      });
    }
  });
