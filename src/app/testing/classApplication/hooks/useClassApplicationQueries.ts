import { api } from "@/trpc/react";

import type { z } from "zod";
import {
  readClassApplicationsSchema,
  readClassApplicationByIdSchema,
  readClassApplicationsByFilterSchema,
  readDeletedClassApplicationsSchema,
} from "@/schemas";

// Type inference from schemas
type ReadAllClassApplicationsInput = z.infer<
  typeof readClassApplicationsSchema
>;
type ReadClassApplicationByIdInput = z.infer<
  typeof readClassApplicationByIdSchema
>;
type ReadClassApplicationsByFilterInput = z.infer<
  typeof readClassApplicationsByFilterSchema
>;
type ReadDeletedClassApplicationsInput = z.infer<
  typeof readDeletedClassApplicationsSchema
>;

export const useClassApplicationQueries = () => {
  const useAllClassApplications = (input: ReadAllClassApplicationsInput) => {
    return api.classApplication.read.useQuery(input);
  };

  const useClassApplicationById = (input: ReadClassApplicationByIdInput) => {
    return api.classApplication.readById.useQuery(input);
  };

  const useClassApplicationsByFilter = (
    input: ReadClassApplicationsByFilterInput
  ) => {
    return api.classApplication.readByFilter.useQuery(input);
  };

  const useDeletedClassApplications = (
    input: ReadDeletedClassApplicationsInput
  ) => {
    return api.classApplication.readDeleted.useQuery(input);
  };

  return {
    useAllClassApplications,
    useClassApplicationById,
    useClassApplicationsByFilter,
    useDeletedClassApplications,
  };
};
