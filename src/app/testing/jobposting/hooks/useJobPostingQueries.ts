import { api, RouterInputs } from "@/trpc/react";

import {
  getJobPostingByIdSchema
} from "@/schemas";
import type { z } from "zod";

// Type inference from schemas
type GetAllJobPostingInput = RouterInputs["jobPosting"]["read"];
type GetAllCompanyInput = RouterInputs["company"]["read"];
type GetAllIndustryInput = RouterInputs["industry"]["read"];
type GetJobPostingByIdInput = z.infer<typeof getJobPostingByIdSchema>;

export const useJobPostingQueries = () => {
  const useAllJobPosting = (
    input: GetAllJobPostingInput = { limit: 10, offset: 0 }
  ) => {
    return api.jobPosting.read.useQuery(input);
  };

  const useAllCompany = (
    input: GetAllCompanyInput = { limit: 10, offset: 0 }
  ) => {
    return api.company.read.useQuery(input);
  };

  const useAllIndustry = (
    input: GetAllIndustryInput = { limit: 10, offset: 0 }
  ) => {
    return api.industry.read.useQuery(input);
  };

  const useJobPostingById = (input: GetJobPostingByIdInput) => {
    return api.jobPosting.getById.useQuery(input);
  };


  return {
    useAllJobPosting,
    useJobPostingById,
    useAllCompany,
    useAllIndustry
  };
};
