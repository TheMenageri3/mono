import { protectedProcedure } from "~/server/api/trpc";

import { z } from "zod";
export const createUser = protectedProcedure
  .input(
    z.object({
      username: z.string(),
      bio: z.string(),
      profileImage: z.string(),
      type: z.string(),
      organization: z.string(),
      interests: z.array(z.string()),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const email = ctx.session?.user?.email;
    if (!email) {
      throw new Error("Email is required");
    }
    const { username, bio, profileImage, type, organization, interests } = input;
    const newUser = await ctx.db.user.update({
      where: { email },
      data: {
        username,
        bio,
        image: profileImage,
        type,
        organization,
        interests,
      },
    });
    return newUser;
  });
