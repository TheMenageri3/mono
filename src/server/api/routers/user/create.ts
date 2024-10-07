import { protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";
export const createUser = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      username: z.string(),
      email: z.string(),
      bio: z.string(),
      image: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { name, username, email, bio, image } = input;
    const user = await ctx.db.user.create({
      data: { name, username, email, bio, image },
    });
    return user;
  });
