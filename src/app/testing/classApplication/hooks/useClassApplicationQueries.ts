import { api, RouterInputs } from "@/trpc/react";

import type { z } from "zod";
import {
  getClassApplicationsSchema,
  getClassApplicationByIdSchema,
  getClassApplicationsByClassSchema,
  getClassApplicationsByFilterSchema,
  getDeletedClassApplicationsByClassSchema,
} from "@/schemas";

// Type inference from schemas
type GetAllClassApplicationsInput = z.infer<typeof getClassApplicationsSchema>;
type GetClassApplicationByIdInput = z.infer<
  typeof getClassApplicationByIdSchema
>;
type GetClassApplicationsByClassInput = z.infer<
  typeof getClassApplicationsByClassSchema
>;
type GetClassApplicationsByFilterInput = z.infer<
  typeof getClassApplicationsByFilterSchema
>;
type GetDeletedClassApplicationsByClassInput = z.infer<
  typeof getDeletedClassApplicationsByClassSchema
>;

export const useClassApplicationQueries = () => {
  const useAllClassApplications = (input: GetAllClassApplicationsInput) => {
    return api.classApplication.read.useQuery(input);
  };

  const useClassApplicationById = (input: GetClassApplicationByIdInput) => {
    return api.classApplication.readById.useQuery(input);
  };

  const useClassApplicationByClass = (
    input: GetClassApplicationsByClassInput
  ) => {
    return api.classApplication.readByClass.useQuery(input);
  };

  const useClassApplicationByFilter = (
    input: GetClassApplicationsByFilterInput
  ) => {
    return api.classApplication.readByFilter.useQuery(input);
  };

  const useDeletedClassApplicationsByClass = (
    input: GetDeletedClassApplicationsByClassInput
  ) => {
    return api.classApplication.readDeletedByClass.useQuery(input);
  };

  return {
    useAllClassApplications,
    useClassApplicationById,
    useClassApplicationByClass,
    useClassApplicationByFilter,
    useDeletedClassApplicationsByClass,
  };
};
