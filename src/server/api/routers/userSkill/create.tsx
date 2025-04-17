import { protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createUserSkill = protectedProcedure
  .input(
    z.object({
      tagname: z.string(),
      selfRating: z.number().min(0).max(5).optional(),
      notes: z.string().optional(),
      profileId: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.session.user.id;
    try {
      return await ctx.db.userSkill.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create user skill",
        cause: error,
      });
    }
  });
