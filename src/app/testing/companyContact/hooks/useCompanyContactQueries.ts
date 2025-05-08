import { api } from "@/trpc/react";

import type { z } from "zod";
import {
  readCompanyContactsByCompanyIdSchema,
  readDeletedCompanyContactsByCompanyIdSchema,
  readCompanyContactsByUserIdSchema,
  readCompanyContactsByProfileIdSchema,
  readCompanyContactByIdSchema,
  readCompanyContactsSchema,
  readDeletedCompanyContactsSchema,
} from "@/schemas";

// Type inference from schemas
type ReadCompanyContactsByCompanyIdInput = z.infer<
  typeof readCompanyContactsByCompanyIdSchema
>;
type ReadDeletedCompanyContactsByCompanyIdInput = z.infer<
  typeof readDeletedCompanyContactsByCompanyIdSchema
>;
type ReadCompanyContactsByUserIdInput = z.infer<
  typeof readCompanyContactsByUserIdSchema
>;
type ReadCompanyContactsByProfileIdInput = z.infer<
  typeof readCompanyContactsByProfileIdSchema
>;
type ReadCompanyContactByIdInput = z.infer<typeof readCompanyContactByIdSchema>;
type ReadCompanyContactsInput = z.infer<typeof readCompanyContactsSchema>;
type ReadDeletedCompanyContactsInput = z.infer<
  typeof readDeletedCompanyContactsSchema
>;

export const useCompanyContactQueries = () => {
  // Get contact by ID query
  const useCompanyContactById = (input: ReadCompanyContactByIdInput) => {
    const { data, isLoading, isError, error, refetch } =
      api.companyContact.readById.useQuery(input, {
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

  // Get contacts by company ID query
  const useCompanyContactsByCompanyId = (
    input: ReadCompanyContactsByCompanyIdInput
  ) => {
    const { data, isLoading, isError, error, refetch } =
      api.companyContact.readByCompanyId.useQuery(input, {
        enabled: !!input.companyId,
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

  // Get deleted contacts by company ID query
  const useDeletedCompanyContactsByCompanyId = (
    input: ReadDeletedCompanyContactsByCompanyIdInput
  ) => {
    const { data, isLoading, isError, error, refetch } =
      api.companyContact.readDeletedByCompanyId.useQuery(input, {
        enabled: !!input.companyId,
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

  // Get contacts by user ID query
  const useCompanyContactsByUserId = (
    input: ReadCompanyContactsByUserIdInput
  ) => {
    const { data, isLoading, isError, error, refetch } =
      api.companyContact.readByUserId.useQuery(input, {
        enabled: !!input.userId,
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

  // Get contacts by profile ID query
  const useCompanyContactsByProfileId = (
    input: ReadCompanyContactsByProfileIdInput
  ) => {
    const { data, isLoading, isError, error, refetch } =
      api.companyContact.readByProfileId.useQuery(input, {
        enabled: !!input.profileId,
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

  // Get all contacts query
  const useAllCompanyContacts = (input: ReadCompanyContactsInput) => {
    const { data, isLoading, isError, error, refetch } =
      api.companyContact.read.useQuery(input);

    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  };

  // Get deleted contacts query
  const useDeletedCompanyContacts = (
    input: ReadDeletedCompanyContactsInput
  ) => {
    const { data, isLoading, isError, error, refetch } =
      api.companyContact.readDeleted.useQuery(input);

    return {
      data,
      isLoading,
      isError,
      error,
      refetch,
    };
  };

  return {
    useCompanyContactById,
    useCompanyContactsByCompanyId,
    useDeletedCompanyContactsByCompanyId,
    useCompanyContactsByUserId,
    useCompanyContactsByProfileId,
    useAllCompanyContacts,
    useDeletedCompanyContacts,
  };
};
