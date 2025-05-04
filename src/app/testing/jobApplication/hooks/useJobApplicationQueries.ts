import { api, RouterInputs } from "@/trpc/react";

import {
  getJobApplicationByIdSchema
} from "@/schemas";
import type { z } from "zod";

// Type inference from schemas
type GetAllJobApplicationsInput = RouterInputs["jobApplication"]["readAll"];
type GetAllJobPostingsInput = RouterInputs["jobPosting"]["read"];
type GetAllResumeInput = RouterInputs["media"]["read"];
type GetJobApplicationByIdInput = z.infer<typeof getJobApplicationByIdSchema>;

export const useJobApplicatioQueries = () => {
  const useAllJobApplications = (
    input: GetAllJobApplicationsInput = { limit: 10, offset: 0 }
  ) => {
    return api.jobApplication.readAll.useQuery(input);
  };

  const useAllJobPostings = (
    input: GetAllJobPostingsInput = { limit: 10, offset: 0 }
  ) => {
    return api.jobPosting.read.useQuery(input);
  };

  const useAllMedia = (
    input: GetAllResumeInput = { limit: 10, offset: 0 }
  ) => {
    return api.media.read.useQuery(input);
  };

  const useJobApplicationById = (input: GetJobApplicationByIdInput) => {
    return api.jobApplication.getById.useQuery(input);
  };


  return {
    useAllJobApplications,
    useJobApplicationById,
    useAllJobPostings,
    useAllMedia
    
  };
};
