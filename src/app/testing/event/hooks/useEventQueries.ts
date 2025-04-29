import { api, RouterInputs } from "@/trpc/react";

import type { z } from "zod";
import {
  getAllEventsSchema,
  getEventByIdSchema,
  getEventsByLocationIdSchema,
  getEventsByOrganiserIdSchema,
  getFeaturedEventsSchema,
  getEventByStatusSchema,
  getEventsByTypeSchema,
} from "@/schemas";

// Type inference from schemas
type GetAllEventsInput = RouterInputs["event"]["readAllEvents"];
type GetEventByIdInput = z.infer<typeof getEventByIdSchema>;
type GetEventsByLocationInput = z.infer<typeof getEventsByLocationIdSchema>;
type GetEventsByOrganiserInput = z.infer<typeof getEventsByOrganiserIdSchema>;
type GetFeaturedEventsInput = z.infer<typeof getFeaturedEventsSchema>;
type GetEventsByStatusInput = z.infer<typeof getEventByStatusSchema>;
type GetEventsByTypeInput = z.infer<typeof getEventsByTypeSchema>;

export const useEventQueries = () => {
  const useAllEvents = (
    input: GetAllEventsInput = { limit: 10, offset: 0 }
  ) => {
    return api.event.readAllEvents.useQuery(input);
  };

  const useEventById = (input: GetEventByIdInput) => {
    return api.event.readEventById.useQuery(input);
  };

  const useEventsByOrganiser = (input: GetEventsByOrganiserInput) => {
    return api.event.readEventsByOrganiserId.useQuery(input);
  };

  const useEventsByLocation = (input: GetEventsByLocationInput) => {
    return api.event.readEventsByLocationId.useQuery(input);
  };

  const useFeaturedEvents = (input: GetFeaturedEventsInput = {}) => {
    return api.event.readFeaturedEvents.useQuery(input);
  };

  const useEventsByStatus = (input: GetEventsByStatusInput) => {
    return api.event.readEventsByStatus.useQuery(input);
  };

  const useEventsByType = (input: GetEventsByTypeInput) => {
    return api.event.readEventsByType.useQuery(input);
  };

  return {
    useAllEvents,
    useEventById,
    useEventsByOrganiser,
    useEventsByLocation,
    useFeaturedEvents,
    useEventsByStatus,
    useEventsByType,
  };
};
