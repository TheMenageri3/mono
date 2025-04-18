import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const createAdminComment = protectedProcedure
  .input(
    z.object({
      visibility: z.enum(["ADMIN_ONLY", "INSTRUCTORS_ONLY", "STAFF_AND_INSTRUCTORS", "STAFF_INSTRUCTORS_AND_STUDENT", "PUBLIC"]),
      category: z.enum(["FEEDBACK", "EVALUATION", "INTERNAL_NOTE", "DECISION_RATIONALE", "FOLLOWUP_REQUIRED"]),
      priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
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
