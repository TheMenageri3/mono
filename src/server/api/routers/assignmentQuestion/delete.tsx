import { z } from "zod";
import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

const deleteAssignmentQuestion = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    let assignmentQuestion;
    try {
      assignmentQuestion = await ctx.db.assignmentQuestion.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (assignmentQuestion.deletedAt !== null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Assignment question with ID ${input.id} is already deleted.`,
        });
      }
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Assignment question with ID ${input.id} was not found.`,
        cause: error,
      });
    }

    try {
      return await ctx.db.assignmentQuestion.update({
        where: { id: input.id },
        data: {
          deletedAt: new Date(),
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to delete assignment question with ID ${input.id}.`,
        cause: error,
      });
    }
  });

const restoreAssignmentQuestion = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    let assignmentQuestion;
    try {
      assignmentQuestion = await ctx.db.assignmentQuestion.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (assignmentQuestion.deletedAt === null) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Assignment question with ID ${input.id} is not deleted.`,
        });
      }
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Assignment question with ID ${input.id} was not found.`,
        cause: error,
      });
    }

    try {
      return await ctx.db.assignmentQuestion.update({
        where: { id: input.id },
        data: {
          deletedAt: null,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to restore assignment question with ID ${input.id}.`,
        cause: error,
      });
    }
  });


export {
  deleteAssignmentQuestion,
  restoreAssignmentQuestion,
};