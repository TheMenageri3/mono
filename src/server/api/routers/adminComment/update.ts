import { z } from "zod";
import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Category, Priority, Visibility } from "@/generated/prisma/client";

export const updateAdminComment = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      data: z.object({
        visibility: z.nativeEnum(Visibility).optional(),
        category: z.nativeEnum(Category).optional(),
        priority: z.nativeEnum(Priority).optional(),
        resolved: z.boolean().optional(),
        commentId: z.string().optional(),
      }),
    })
  )
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
