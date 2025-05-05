import { z } from "zod";

//create
export const createAssignmentSubmissionAnswerSchema = z.object({
  assignmentSubmissionId: z.string(),
  questionId: z.string(),
  assignmentQuestionId: z.string(),
  answerId: z.string().optional(),
  value: z.object({}),
  feedback: z.string().optional(),
  pointsAwarded: z.number().optional(),
  submitterId: z.string(),
});

//read
export const getAnswerByIdSchema = z.object({ id: z.string() });
export const readAnswersSchema = z.object({
  limit: z.number(),
  offset: z.number(),
});

//update
export const updateAssignmentSubmissionAnswerSchema = z.object({
  id: z.string(),
  data: z.object({
    value: z.object({}).optional(),
    feedback: z.string().optional(),
    pointsAwarded: z.number().optional(),
    answerId: z.string().optional(),
  }),
});

//delete
export const deleteAssignmentSubmissionAnswerSchema = z.object({
  id: z.string(),
});
export const restoreAssignmentSubmissionAnswerSchema = z.object({
  id: z.string(),
});
