import { db } from "@/server/db";
import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const readUser = publicProcedure
  .input(
    z.object({
      publicKey: z.string(),
    })
  )
  .query(async ({ input }: { input: { publicKey: string } }) => {
    const user = await db.user.findFirst({
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
  });
