import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const deleteAdminComment = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existingAdminComment = await ctx.db.adminComment.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (existingAdminComment.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Admin comment already deleted",
        });
      }
      const adminComment = await ctx.db.adminComment.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
      return adminComment;
    } catch (error) {
      console.error("Error deleting admin comment by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete admin comment",
        cause: error,
      });
    }
  });

export const restoreAdminComment = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;
      const existingAdminComment = await ctx.db.adminComment.findUniqueOrThrow({
        where: { id: input.id },
      });
      if (existingAdminComment.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Admin comment is not deleted",
        });
      }
      const adminComment = await ctx.db.adminComment.update({
        where: {
          id: input.id,
        },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
      return adminComment;
    } catch (error) {
      console.error("Error restoring admin comment by id:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to restore admin comment",
        cause: error,
      });
    }
  });