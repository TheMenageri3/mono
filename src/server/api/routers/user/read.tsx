import { db } from "@/server/db";
import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const readUser = publicProcedure
  .input(
    z.object({
      walletAddress: z.string(),
    })
  )
  .query(async ({ input }: { input: { walletAddress: string } }) => {
    const user = await db.user.findFirst({
      where: {
        wallets: {
          some: {
            address: input.walletAddress,
          },
        },
      },
    });
    return user;
  });
