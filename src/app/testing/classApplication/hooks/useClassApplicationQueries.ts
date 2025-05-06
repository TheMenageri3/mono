import { api } from "@/trpc/react";

import type { z } from "zod";
import {
  getClassApplicationsSchema,
  getClassApplicationByIdSchema,
  getClassApplicationsByFilterSchema,
  getDeletedClassApplicationsSchema,
} from "@/schemas";

// Type inference from schemas
type GetAllClassApplicationsInput = z.infer<typeof getClassApplicationsSchema>;
type GetClassApplicationByIdInput = z.infer<
  typeof getClassApplicationByIdSchema
>;
type GetClassApplicationsByFilterInput = z.infer<
  typeof getClassApplicationsByFilterSchema
>;
type GetDeletedClassApplicationsInput = z.infer<
  typeof getDeletedClassApplicationsSchema
>;

export const useClassApplicationQueries = () => {
  const useAllClassApplications = (input: GetAllClassApplicationsInput) => {
    return api.classApplication.read.useQuery(input);
  };

  const useClassApplicationById = (input: GetClassApplicationByIdInput) => {
    return api.classApplication.readById.useQuery(input);
  };

  const useClassApplicationsByFilter = (
    input: GetClassApplicationsByFilterInput
  ) => {
    return api.classApplication.readByFilter.useQuery(input);
  };

  const useDeletedClassApplications = (
    input: GetDeletedClassApplicationsInput
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
