import { z } from "zod";

//create
export const createJobApplicationQuestionSchema = z.object({
  order: z.number(),
  required: z.boolean(),
  points: z.number(),
  section: z.string().nullable().optional(),
  jobApplicationId: z.string(),
  questionId: z.string(),
});

//read
export const readJobApplicationQuestionsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getJobApplicationQuestionByIdSchema = z.object({ id: z.string() });
export const readDeletedJobApplicationQuestionsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateJobApplicationQuestionSchema = z.object({
  id: z.string(),
  order: z.number().optional(),
  required: z.boolean().optional(),
  points: z.number().optional(),
  section: z.string().nullable().optional(),
});

//delete
export const deleteJobApplicationQuestionSchema = z.object({ id: z.string() });
export const restoreJobApplicationQuestionSchema = z.object({ id: z.string() });
