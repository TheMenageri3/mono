import { z } from "zod";

//create
export const createAnswerSchema = z.object({
  value: z.object({}).optional(),
  questionId: z.string(),
  answererId: z.string(),
  assignmentId: z.string().optional(),
});

//read
export const readAnswerByIdSchema = z.object({ id: z.string() });
export const readAllAnswersSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedAnswersSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateAnswerSchema = z.object({
  id: z.string(),
  data: z.object({
    value: z.object({}).optional(),
  }),
});

//delete
export const deleteAnswerSchema = z.object({ id: z.string() });
export const restoreAnswerSchema = z.object({ id: z.string() });
