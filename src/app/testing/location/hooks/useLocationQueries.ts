import { api, RouterInputs } from "@/trpc/react";

import type { z } from "zod";
import { getLocationByIdSchema } from "@/schemas";

// Type inference from schemas
type GetAllLocationInput = RouterInputs["location"]["read"];
type GetLocationByIdInput = z.infer<typeof getLocationByIdSchema>;

export const useLocationQueries = () => {
  const useAllLocations = (
    input: GetAllLocationInput = { limit: 10, offset: 0 }
  ) => {
    return api.location.read.useQuery(input);
  };

  const useLocationById = (input: GetLocationByIdInput) => {
    return api.event.readEventById.useQuery(input);
  };

  return {
    useAllLocations,
    useLocationById,
  };
};
