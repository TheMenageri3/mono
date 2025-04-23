import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Category, Priority, Visibility } from "@/generated/prisma/client";

export const createAdminComment = protectedProcedure
  .input(
    z.object({
      visibility: z.nativeEnum(Visibility),
      category: z.nativeEnum(Category),
      priority: z.nativeEnum(Priority).default(Priority.NORMAL),
      resolved: z.boolean().default(false),
      commentId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    try {
      const adminComment = await ctx.db.adminComment.create({
        data: {
          visibility: input.visibility,
          category: input.category,
          priority: input.priority,
          resolved: input.resolved,
          commentId: input.commentId,
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
