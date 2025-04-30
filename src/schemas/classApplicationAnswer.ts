import { z } from "zod";

//create
export const createClassApplicationAnswerSchema = z.object({
  questionId: z.string(),
  classApplicationQuestionId: z.string(),
  answerId: z.string().optional(),
  classApplicationResponseId: z.string().optional(),
});

//read
export const getClassApplicationAnswerByIdSchema = z.object({ id: z.string() });
export const getClassApplicationAnswerByQuestionIdSchema = z.object({
  questionId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getClassApplicationAnswersByClassApplicationQuestionIdSchema =
  z.object({
    classApplicationQuestionId: z.string(),
    limit: z.number().optional(),
    offset: z.number().optional(),
  });
export const getClassApplicationAnswersByClassApplicationResponseIdSchema =
  z.object({
    classApplicationResponseId: z.string(),
    limit: z.number().optional(),
    offset: z.number().optional(),
  });
export const getDeletedClassApplicationAnswersSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateClassApplicationAnswerSchema = z.object({
  id: z.string(),
  questionId: z.string().optional(),
  classApplicationQuestionId: z.string().optional(),
  answerId: z.string().optional(),
  classApplicationResponseId: z.string().optional(),
});

//delete
export const deleteClassApplicationAnswerSchema = z.object({ id: z.string() });
export const restoreClassApplicationAnswerSchema = z.object({
  id: z.string(),
});
