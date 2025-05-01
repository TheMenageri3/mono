import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateCommentSchema } from "@/schemas";

const updateComment = protectedProcedure
  .input(updateCommentSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    let comment;
    try {
      comment = await ctx.db.comment.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (comment.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Comment with ID ${input.id} has been deleted.`,
        });
      }

      return await ctx.db.comment.update({
        where: { id: input.id },
        data: {
          ...input.data,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to update comment with ID ${input.id}.`,
        cause: error,
      });
    }
  });

export { updateComment };
