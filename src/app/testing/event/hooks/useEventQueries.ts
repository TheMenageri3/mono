// src/app/testing/event/hooks/useEventQueries.ts

import { api } from "@/trpc/react";
import type { RouterInputs } from "@/trpc/shared";
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

// Export individual hooks instead of a factory function
export const useAllEvents = (
  input: GetAllEventsInput = { limit: 10, offset: 0 }
) => {
  return api.event.readAllEvents.useQuery(input);
};

export const useEventById = (input: GetEventByIdInput) => {
  return api.event.readEventById.useQuery(input);
};

export const useEventsByOrganiser = (input: GetEventsByOrganiserInput) => {
  return api.event.readEventsByOrganiserId.useQuery(input);
};

export const useEventsByLocation = (input: GetEventsByLocationInput) => {
  return api.event.readEventsByLocationId.useQuery(input);
};

export const useFeaturedEvents = (input: GetFeaturedEventsInput = {}) => {
  return api.event.readFeaturedEvents.useQuery(input);
};

export const useEventsByStatus = (input: GetEventsByStatusInput) => {
  return api.event.readEventsByStatus.useQuery(input);
};

export const useEventsByType = (input: GetEventsByTypeInput) => {
  return api.event.readEventsByType.useQuery(input);
};
