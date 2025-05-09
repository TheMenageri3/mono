import { api } from "@/trpc/react";

import type { z } from "zod";
import {
  readPlacementsSchema,
  getPlacementByIdSchema,
  getPlacementByDataSchema,
  readDeletedPlacementsSchema,
} from "@/schemas";

// Type inference from schemas

type ReadAllPlacementInput = z.infer<typeof readPlacementsSchema>;
type ReadPlacementIdInput = z.infer<typeof getPlacementByIdSchema>;

type ReadPlacementsByFilterInput = z.infer<typeof getPlacementByDataSchema>;
type ReadDeletedPlacementsInput = z.infer<typeof readDeletedPlacementsSchema>;

export const usePlacementsQueries = () => {
  const useAllPlacements = (input: ReadAllPlacementInput) => {
    return api.placement.read.useQuery(input);
  };

  const usePlacementById = (input: ReadPlacementIdInput) => {
    return api.placement.getById.useQuery(input);
  };

  const usePlacementsByFilter = (input: ReadPlacementsByFilterInput) => {
    return api.placement.getByData.useQuery(input);
  };

  const useDeletedPlacements = (input: ReadDeletedPlacementsInput) => {
    return api.placement.readDeleted.useQuery(input);
  };

  return {
    useAllPlacements,
    usePlacementById,
    usePlacementsByFilter,
    useDeletedPlacements,
  };
};
