import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const updateUserSkill = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      tagname: z.string().optional(),
      selfRating: z.number().min(0).max(5).optional(),
      notes: z.string().optional(),
      profileId: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    try {
      const userId = ctx.session.user.id;
      const existing = await ctx.db.userSkill.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (existing.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User skill already deleted",
        });
      }
      return await ctx.db.userSkill.update({
        where: { id: input.id },
        data: {
          ...input,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update user skill",
        cause: error,
      });
    }
  });
