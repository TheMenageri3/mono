import { api } from "@/trpc/react";
import type { z } from "zod";
import { readLocationsSchema } from "@/schemas";

type GetAllLocationsInput = z.infer<typeof readLocationsSchema>;

export const useLocationQueries = () => {
  const useAllLocations = (
    input: GetAllLocationsInput = { limit: 10, offset: 0 }
  ) => {
    return api.location.read.useQuery(input);
  };

  return {
    useAllLocations,
  };
};
