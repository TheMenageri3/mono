import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createAdminCommentSchema } from "@/schemas";

export const createAdminComment = protectedProcedure
  .input(createAdminCommentSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const adminComment = await ctx.db.adminComment.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return adminComment;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create admin comment",
        cause: error,
      });
    }
  });
