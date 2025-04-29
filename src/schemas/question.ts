import { z } from "zod";
import { QuestionType } from "@/generated/prisma";

//create
export const createQuestionSchema = z.object({
  text: z.string(),
  description: z.string().optional(),
  type: z.nativeEnum(QuestionType),
  required: z.boolean(),
  order: z.number().int().optional(),
  metadata: z.object({}).optional(),
});

//read
export const readQuestionByIdSchema = z.object({ id: z.string() });
export const readAllActiveQuestionsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedQuestionsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateQuestionsSchema = z.object({
  id: z.string(),
  data: z.object({
    text: z.string().optional(),
    description: z.string().optional(),
    type: z.nativeEnum(QuestionType).optional(),
    required: z.boolean().optional(),
    order: z.number().int().optional(),
    metadata: z.object({}).optional(),
  }),
});

//delete
export const deleteQuestionSchema = z.object({ id: z.string() });
export const restoreQuestionSchema = z.object({ id: z.string() });
