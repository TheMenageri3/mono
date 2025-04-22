import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const readUserByWallet = protectedProcedure
  .input(
    z.object({
      publicKey: z.string(),
    })
  )
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

export const readUsers = protectedProcedure.query(async ({ ctx }) => {
  try {
    const users = await ctx.db.user.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        updatedAt: "desc",
      },
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
export const readDeletedUsers = protectedProcedure.query(async ({ ctx }) => {
  try {
    const users = await ctx.db.user.findMany({
      where: {
        deletedAt: { not: null },
      },
      orderBy: {
        updatedAt: "desc",
      },
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
  .input(z.object({ email: z.string() }))
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
