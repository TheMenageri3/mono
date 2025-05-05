import { protectedProcedure } from "@/server/api/trpc";
import {
  readUserByWalletSchema,
  readUsersSchema,
  readDeletedUsersSchema,
  readUserByEmailSchema,
} from "@/schemas";
import { TRPCError } from "@trpc/server";

export const readUserByWallet = protectedProcedure
  .input(readUserByWalletSchema)
  .query(async ({ ctx, input }) => {
    try {
      const user = await ctx.db.user.findFirst({
        where: {
          profile: {
            wallets: {
              some: {
                publicKey: input.publicKey,
              },
            },
          },
        },
      });
      return user;
    } catch (error) {
      console.log("Error reading user by wallet:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read user by wallet",
        cause: error,
      });
    }
  });

export const readUsers = protectedProcedure
  .input(readUsersSchema)
  .query(async ({ ctx, input }) => {
    try {
      const users = await ctx.db.user.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return users;
    } catch (error) {
      console.error("Error reading users:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read users",
        cause: error,
      });
    }
  });
export const readDeletedUsers = protectedProcedure
  .input(readDeletedUsersSchema)
  .query(async ({ ctx, input }) => {
    try {
      const users = await ctx.db.user.findMany({
        where: {
          deletedAt: { not: null },
        },
        orderBy: {
          updatedAt: "desc",
        },
        take: input.limit,
        skip: input.offset,
      });
      return users;
    } catch (error) {
      console.error("Error reading deleted users:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read deleted users",
        cause: error,
      });
    }
  });

export const readUserByEmail = protectedProcedure
  .input(readUserByEmailSchema)
  .query(async ({ input, ctx }) => {
    try {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email, deletedAt: null },
      });
      return user;
    } catch (error) {
      console.error("Error reading user by email:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to read user by email",
        cause: error,
      });
    }
  });
