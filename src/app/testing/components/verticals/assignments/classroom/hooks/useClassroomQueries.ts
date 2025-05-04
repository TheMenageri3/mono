import { api } from "@/trpc/react";
import type { z } from "zod";

import {
  readClassesSchema,
  readDeletedClassesSchema,
  getClassByIdSchema,
  getClassesByDataSchema,
} from "@/schemas";

type ReadClassesInput = z.infer<typeof readClassesSchema>;
type ReadDeletedClassesInput = z.infer<typeof readDeletedClassesSchema>;
type GetClassByIdInput = z.infer<typeof getClassByIdSchema>;
type GetClassesByDataInput = z.infer<typeof getClassesByDataSchema>;

export const useClassQueries = () => {
  const useAllClasses = (
    input: ReadClassesInput = { limit: 10, offset: 0 }
  ) => {
    return api.class.read.useQuery(input);
  };

  // All deleted classes (optionally paginated)
  const useAllDeletedClasses = (
    input: ReadDeletedClassesInput = { limit: 10, offset: 0 }
  ) => {
    return api.class.readDeleted.useQuery(input);
  };

  // Single class by ID
  const useClassById = (input: GetClassByIdInput) => {
    return api.class.getById.useQuery(input);
  };

  // Classes filtered by various criteria
  const useClassesByData = (input: GetClassesByDataInput) => {
    return api.class.getByData.useQuery({ ...input, limit: 10, offset: 0 });
  };

  return {
    useAllClasses,
    useAllDeletedClasses,
    useClassById,
    useClassesByData,
  };
};
