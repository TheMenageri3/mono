import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { updateAdminCommentSchema } from "@/schemas";

export const updateAdminComment = protectedProcedure
  .input(updateAdminCommentSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    let adminComment;
    try {
      adminComment = await ctx.db.adminComment.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (adminComment.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Admin comment with ID ${input.id} has been deleted.`,
        });
      }
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Admin comment with ID ${input.id} was not found.`,
        cause: error,
      });
    }

    try {
      return await ctx.db.adminComment.update({
        where: { id: input.id },
        data: {
          ...input.data,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to update admin comment with ID ${input.id}.`,
        cause: error,
      });
    }
  });
