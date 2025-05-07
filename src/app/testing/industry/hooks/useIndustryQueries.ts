import { api } from "@/trpc/react";
import type { z } from "zod";
import {
  getIndustryByIdSchema,
  readIndustriesSchema,
  readDeletedIndustriesSchema,
} from "@/schemas/industry";

// Type inference for query inputs
type GetIndustryByIdInput = z.infer<typeof getIndustryByIdSchema>;
type ReadIndustriesInput = z.infer<typeof readIndustriesSchema>;
type ReadDeletedIndustriesInput = z.infer<typeof readDeletedIndustriesSchema>;

export const useIndustryQueries = () => {
  // Fetch all industries query
  const useAllIndustries = (input: ReadIndustriesInput = {}) => {
    return api.industry.read.useQuery(input);
  };

  // Fetch industry by ID query
  const useIndustryById = (input: GetIndustryByIdInput) => {
    return api.industry.getById.useQuery(input);
  };

  // Fetch deleted industries query
  const useDeletedIndustries = (input: ReadDeletedIndustriesInput = {}) => {
    return api.industry.readDeleted.useQuery(input);
  };

  return {
    useAllIndustries,
    useIndustryById,
    useDeletedIndustries,
  };
};
