import { api } from "@/trpc/react";

import type { z } from "zod";
import {
  readCompanyByIdSchema,
  readCompaniesSchema,
  readDeletedCompaniesSchema,
  readCompaniesByIndustrySchema,
  searchCompaniesSchema,
} from "@/schemas";

// Type inference from schemas
type ReadCompanyByIdInput = z.infer<typeof readCompanyByIdSchema>;
type ReadCompaniesInput = z.infer<typeof readCompaniesSchema>;
type ReadDeletedCompaniesInput = z.infer<typeof readDeletedCompaniesSchema>;
type ReadCompaniesByIndustryInput = z.infer<
  typeof readCompaniesByIndustrySchema
>;
type SearchCompaniesInput = z.infer<typeof searchCompaniesSchema>;

export const useCompanyQueries = () => {
  // Get company by ID query
  const useCompanyByIdInput = (input: ReadCompanyByIdInput) => {
    const { data, isLoading, isError, error, refetch } =
      api.company.readById.useQuery(input, {
        enabled: !!input.id,
        retry: false,
      });

    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  };

  // Get all companies query
  const useAllCompanies = (input: ReadCompaniesInput) => {
    const { data, isLoading, isError, error, refetch } =
      api.company.read.useQuery(input);

    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  };

  // Get deleted companies query
  const useDeletedCompaniesInput = (input: ReadDeletedCompaniesInput) => {
    const { data, isLoading, isError, error, refetch } =
      api.company.readDeleted.useQuery(input);

    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  };

  // Get companies by industry query
  const useCompaniesByIndustryInput = (input: ReadCompaniesByIndustryInput) => {
    const { data, isLoading, isError, error, refetch } =
      api.company.readByIndustry.useQuery(input, {
        enabled: !!input.industry,
        retry: false,
      });

    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  };

  // Search companies query
  const useSearchCompaniesInput = (input: SearchCompaniesInput) => {
    const { data, isLoading, isError, error, refetch } =
      api.company.search.useQuery(input, {
        enabled: !!input.query && input.query.length > 0,
        retry: false,
      });

    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  };

  return {
    useCompanyByIdInput,
    useAllCompanies,
    useDeletedCompaniesInput,
    useCompaniesByIndustryInput,
    useSearchCompaniesInput,
  };
};
