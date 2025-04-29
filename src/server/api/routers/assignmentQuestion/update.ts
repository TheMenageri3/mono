import { protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import {
  updateAssignmentQuestionsSchema,
  updateAssigbmentQuestionBulkSchema,
  updateAssignmentQuestionOrderSchema,
} from "@/schemas";

const updateAssignmentQuestions = protectedProcedure
  .input(updateAssignmentQuestionsSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    let assignmentQuestion;

    try {
      const assignmentQuestion =
        await ctx.db.assignmentQuestion.findUniqueOrThrow({
          where: { id: input.id },
        });

      if (assignmentQuestion.deletedAt !== null) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Assignment question with ID ${input.id} has been deleted.`,
        });
      }

      return await ctx.db.assignmentQuestion.update({
        where: { id: input.id },
        data: {
          ...input.data,
          updatedById: userId,
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to process assignment question with ID ${input.id}.`,
        cause: error,
      });
    }
  });

const updateAssignmentQuestionsBulk = protectedProcedure
  .input(updateAssigbmentQuestionBulkSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      const results = await Promise.all(
        input.questions.map(async (question) => {
          return await ctx.db.assignmentQuestion.update({
            where: { id: question.id },
            data: {
              ...question.data,
              updatedById: userId,
            },
          });
        })
      );

      return results;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update assignment questions in bulk.",
        cause: error,
      });
    }
  });

const updateAssignmentQuestionOrder = protectedProcedure
  .input(updateAssignmentQuestionOrderSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      const results = await Promise.all(
        input.orders.map(async (item) => {
          return await ctx.db.assignmentQuestion.update({
            where: {
              id: item.id,
              assignmentId: input.assignmentId,
            },
            data: {
              order: item.data.order,
              updatedById: userId,
            },
          });
        })
      );

      return results;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update question ordering.",
        cause: error,
      });
    }
  });

export {
  updateAssignmentQuestions,
  updateAssignmentQuestionsBulk,
  updateAssignmentQuestionOrder,
};
