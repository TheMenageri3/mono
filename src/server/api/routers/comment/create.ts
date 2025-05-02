import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createCommentSchema } from "@/schemas";

const createComment = protectedProcedure
  .input(createCommentSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const comment = await ctx.db.comment.create({
        data: {
          ...input,
          createdById: userId,
          updatedById: userId,
        },
      });
      return comment;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create comment",
        cause: error,
      });
    }
  });

export { createComment };
