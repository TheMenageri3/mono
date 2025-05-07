import { api } from "@/trpc/react";
import type { z } from "zod";
import { readProfilesSchema } from "@/schemas";

// Type inference from schemas
type ReadProfilesInput = z.infer<typeof readProfilesSchema>;

export const useProfileQueries = () => {
  const useProfiles = (input: ReadProfilesInput = { limit: 10, offset: 0 }) => {
    return api.profile.read.useQuery(input);
  };

  return {
    useProfiles,
  };
};
