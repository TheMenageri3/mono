import { protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const updateAssignmentQuestions = protectedProcedure
    .input(
        z.object({
            id: z.string(),
            data: z.object({
                order: z.number().int().optional(),
                required: z.boolean().optional(),
                points: z.number().finite().optional(),
                section: z.string().nullable().optional(),
                questionId: z.string().optional(),
            }),
        })
    )
    .mutation(async ({ ctx, input}) => {
        const userId = ctx.session.user.id;
        let assignmentQuestion;

        try {
          const assignmentQuestion = await ctx.db.assignmentQuestion.findUniqueOrThrow({
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
    .input(
      z.object({
        questions: z.array(
          z.object({
            id: z.string(),
            data: z.object({
              order: z.number().int().optional(),
              required: z.boolean().optional(),
              points: z.number().nonnegative().optional(),
              section: z.string().nullable().optional(),
            }),
          })
        ),
      })
    )
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
    .input(
      z.object({
        assignmentId: z.string(),
        orders: z.array(
          z.object({
            id: z.string(),
            data: z.object({
              order: z.number().int(),
            }),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
  
      try {
        const results = await Promise.all(
          input.orders.map(async (item) => {
            return await ctx.db.assignmentQuestion.update({
              where: { 
                id: item.id,
                assignmentId: input.assignmentId
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
    updateAssignmentQuestionOrder
}