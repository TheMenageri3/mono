// testing/workHistory/hooks/useWorkHistoryQueries.ts
import { api, RouterInputs } from "@/trpc/react";
import type { z } from "zod";
import {
  getWorkHistoryByIdSchema,
  readWorkHistorySchema,
  readDeletedWorkHistorySchema,
} from "@/schemas/workHistory";

// Type inference
type GetWorkHistoryByIdInput = z.infer<typeof getWorkHistoryByIdSchema>;
type ReadWorkHistoryInput = z.infer<typeof readWorkHistorySchema>;
type ReadDeletedWorkHistoryInput = z.infer<typeof readDeletedWorkHistorySchema>;

export const useWorkHistoryQueries = () => {
  const useAllWorkHistory = (input: ReadWorkHistoryInput = {}) => {
    return api.workHistory.read.useQuery(input);
  };

  const useWorkHistoryById = (input: GetWorkHistoryByIdInput) => {
    return api.workHistory.getById.useQuery(input);
  };

  const useDeletedWorkHistory = (input: ReadDeletedWorkHistoryInput = {}) => {
    return api.workHistory.readDeleted.useQuery(input);
  };

  return {
    useAllWorkHistory,
    useWorkHistoryById,
    useDeletedWorkHistory,
  };
};
