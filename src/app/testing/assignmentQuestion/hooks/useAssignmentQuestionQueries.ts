import { api, RouterInputs } from "@/trpc/react";

import type { z } from "zod";
import {
  getAllAssignmentQuestionsSchema,
  getAssignmentQuestionsByAssignmentIdSchema,
  getAssignmentQuestionByIdSchema,
  getAssignmentQuestionsByFilterSchema,
  getSectionsByAssignmentIdSchema,
} from "@/schemas";

// Type inference from schemas
type GetAllAssignmentQuestionsInput = RouterInputs["assignmentQuestion"]["readAll"];
type GetAssignmentQuestionsByAssignmentIdInput = z.infer<typeof getAssignmentQuestionsByAssignmentIdSchema>;
type GetAssignmentQuestionByIdInput = z.infer<typeof getAssignmentQuestionByIdSchema>;
type GetAssignmentQuestionsByFilterInput = z.infer<typeof getAssignmentQuestionsByFilterSchema>;
type GetSectionsByAssignmentIdInput = z.infer<typeof getSectionsByAssignmentIdSchema>;

export const useAssignmentQuestionQueries = () => {
  const useAllAssignmentQuestions = (
    input: GetAllAssignmentQuestionsInput = { limit: 10, offset: 0 }
  ) => {
    return api.assignmentQuestion.readAll.useQuery(input);
  };

  const useAssignmentQuestionsByAssignmentIdInput = (
    input: GetAssignmentQuestionsByAssignmentIdInput
  ) => {
    return api.assignmentQuestion.read.useQuery(input);
  };

  const useAssignmentQuestionByIdInput = (
    input: GetAssignmentQuestionByIdInput
  ) => {
    const isValidId = typeof input.id === "string" && input.id.trim() !== "";
  
    return api.assignmentQuestion.readById.useQuery(
      { id: input.id },
      {
        enabled: isValidId,
      }
    );
  };  

  const useAssignmentQuestionByFilterInput = (
    input: GetAssignmentQuestionsByFilterInput
  ) => {
    return api.assignmentQuestion.readByFilter.useQuery(input);
  };

  const useSectionsByAssignmentIdInput = (
    input: GetSectionsByAssignmentIdInput
  ) => {
    return api.assignmentQuestion.getSections.useQuery(input);
  };

  return {
    useAllAssignmentQuestions,
    useAssignmentQuestionsByAssignmentIdInput,
    useAssignmentQuestionByIdInput,
    useAssignmentQuestionByFilterInput,
    useSectionsByAssignmentIdInput,
  };
};
