import { z } from "zod";

//create
export const createAssignmentQuestionSchema = z.object({
  questionId: z.string(),
  assignmentId: z.string(),
  order: z.number(),
  required: z.boolean(),
  points: z.number().finite(),
  section: z.string().optional(),
});

//read
export const getAllAssignmentQuestionsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getAssignmentQuestionByIdSchema = z.object({ id: z.string() });
export const getAssignmentQuestionsByAssignmentIdSchema = z.object({
  assignmentId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getSectionsByAssignmentIdSchema = z.object({
  assignmentId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getDeletedAssignmentQuestionsByAssignmentIdSchema = z.object({
  assignmentId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getAssignmentQuestionsByFilterSchema = z.object({
  assignmentId: z.string().optional(),
  questionId: z.string().optional(),
  section: z.string().optional(),
  required: z.boolean().optional(),
  order: z.number().optional(),
  includeDeleted: z.boolean().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateAssignmentQuestionsSchema = z.object({
  id: z.string(),
  data: z.object({
    order: z.number().optional(),
    required: z.boolean().optional(),
    points: z.number().finite().optional(),
    section: z.string().nullable().optional(),
    questionId: z.string().optional(),
  }),
});
export const updateAssignmentQuestionBulkSchema = z.object({
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
});
export const updateAssignmentQuestionOrderSchema = z.object({
  assignmentId: z.string(),
  orders: z.array(
    z.object({
      id: z.string(),
      data: z.object({
        order: z.number().int(),
      }),
    })
  ),
});

//delete
export const deleteAssignmentQuestionSchema = z.object({ id: z.string() });
export const restoreAssignmentQuestionSchema = z.object({ id: z.string() });
