import { api } from "@/trpc/react";

import type { z } from "zod";
import {
  readInterviewsSchema,
  getInterviewByIdSchema,
  getInterviewByDataSchema,
  readDeletedInterviewsSchema,
} from "@/schemas";

// Type inference from schemas
type ReadAllInterviewInput = z.infer<typeof readInterviewsSchema>;
type ReadInterviewIdInput = z.infer<typeof getInterviewByIdSchema>;

type ReadInterviewsByFilterInput = z.infer<typeof getInterviewByDataSchema>;
type ReadDeletedInterviewsInput = z.infer<typeof readDeletedInterviewsSchema>;

export const useInterviewsQueries = () => {
  const useAllInterviews = (input: ReadAllInterviewInput) => {
    return api.interview.read.useQuery(input);
  };

  const useInterviewById = (input: ReadInterviewIdInput) => {
    return api.interview.getById.useQuery(input);
  };

  const useInterviewsByFilter = (input: ReadInterviewsByFilterInput) => {
    return api.interview.getByData.useQuery(input);
  };

  const useDeletedInterviews = (input: ReadDeletedInterviewsInput) => {
    return api.interview.readDeleted.useQuery(input);
  };

  return {
    useAllInterviews,
    useInterviewById,
    useInterviewsByFilter,
    useDeletedInterviews,
  };
};
