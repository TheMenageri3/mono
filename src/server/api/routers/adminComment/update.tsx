import { z } from "zod";
import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const updateAdminComment = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      data: z.object({
        visibility: z.enum(["ADMIN_ONLY", "INSTRUCTORS_ONLY", "STAFF_AND_INSTRUCTORS", "STAFF_INSTRUCTORS_AND_STUDENT", "PUBLIC"]).optional(),
        category: z.enum(["FEEDBACK", "EVALUATION", "INTERNAL_NOTE", "DECISION_RATIONALE", "FOLLOWUP_REQUIRED"]).optional(),
        priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).optional(),
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
