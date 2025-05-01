import { z } from "zod";

//create
export const createClassApplicationQuestionSchema = z.object({
  order: z.number(),
  required: z.boolean(),
  points: z.number(),
  section: z.string().nullable().optional(),
  createdById: z.string(),
  updatedById: z.string(),
  questionId: z.string(),
  classApplicationId: z.string(),
});

//read
export const getClassApplicationQuestionByIdSchema = z.object({
  id: z.string(),
});
export const getClassApplicationQuestionsByClassApplicationIdSchema = z.object({
  classApplicationId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const getDeletedClassApplicationQuestionsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateClassApplicationQuestionSchema = z.object({
  id: z.string(),
  order: z.number().optional(),
  required: z.boolean().optional(),
  points: z.number().optional(),
  section: z.string().nullable().optional().optional(),
  createdById: z.string().optional(),
  updatedById: z.string().optional(),
  questionId: z.string().optional(),
  classApplicationId: z.string().optional(),
});

//delete
export const deleteClassApplicationQuestionSchema = z.object({
  id: z.string(),
});
export const restoreClassApplicationQuestionSchema = z.object({
  id: z.string(),
});
