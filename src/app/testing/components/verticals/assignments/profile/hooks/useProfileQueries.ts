import { api } from "@/trpc/react";
import type { z } from "zod";
import {
  readProfilesSchema,
  readProfileByIdSchema,
  readDeletedProfilesSchema,
} from "@/schemas";

// Infer types from schemas
type ReadProfilesInput = z.infer<typeof readProfilesSchema>;
type ReadProfileByIdInput = z.infer<typeof readProfileByIdSchema>;
type ReadDeletedProfilesInput = z.infer<typeof readDeletedProfilesSchema>;

export const useProfileQueries = () => {
  // Fetch all profiles
  const useAllProfiles = (
    input: ReadProfilesInput = { limit: 10, offset: 0 }
  ) => {
    return api.profile.read.useQuery(input);
  };

  // Fetch a profile by ID
  const useProfileById = (input: ReadProfileByIdInput) => {
    return api.profile.getById.useQuery(input);
  };

  // Fetch deleted profiles
  const useDeletedProfiles = (
    input: ReadDeletedProfilesInput = { limit: 10, offset: 0 }
  ) => {
    return api.profile.readDeleted.useQuery(input);
  };

  return {
    useAllProfiles,
    useProfileById,
    useDeletedProfiles,
  };
};
