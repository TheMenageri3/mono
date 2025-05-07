import { api } from "@/trpc/react";
import type { z } from "zod";
import {
  getJobApplicationQuestionByIdSchema,
  readJobApplicationQuestionsSchema,
  readDeletedJobApplicationQuestionsSchema,
} from "@/schemas/jobApplicationQuestion";

// Type inference for query inputs
type GetJobApplicationQuestionByIdInput = z.infer<typeof getJobApplicationQuestionByIdSchema>;
type ReadJobApplicationQuestionsInput = z.infer<typeof readJobApplicationQuestionsSchema>;
type ReadDeletedJobApplicationQuestionsInput = z.infer<typeof readDeletedJobApplicationQuestionsSchema>;

export const useJobApplicationQuestionQueries = () => {
  // Fetch all job application questions
  const useAllJobApplicationQuestions = (input: ReadJobApplicationQuestionsInput = {}) => {
    return api.jobApplicationQuestion.read.useQuery(input);
  };

  // Fetch job application question by ID
  const useJobApplicationQuestionById = (input: GetJobApplicationQuestionByIdInput) => {
    return api.jobApplicationQuestion.getById.useQuery(input);
  };

  // Fetch deleted job application questions
  const useDeletedJobApplicationQuestions = (input: ReadDeletedJobApplicationQuestionsInput = {}) => {
    return api.jobApplicationQuestion.readDeleted.useQuery(input);
  };

  return {
    useAllJobApplicationQuestions,
    useJobApplicationQuestionById,
    useDeletedJobApplicationQuestions,
  };
};
