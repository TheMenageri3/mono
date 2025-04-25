// src/app/testing/event/hooks/useEventQueries.ts
import { api } from "@/trpc/react";
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
type GetAllEventsInput = z.infer<typeof getAllEventsSchema>;
type GetEventByIdInput = z.infer<typeof getEventByIdSchema>;
type GetEventsByLocationInput = z.infer<typeof getEventsByLocationIdSchema>;
type GetEventsByOrganiserInput = z.infer<typeof getEventsByOrganiserIdSchema>;
type GetFeaturedEventsInput = z.infer<typeof getFeaturedEventsSchema>;
type GetEventsByStatusInput = z.infer<typeof getEventByStatusSchema>;
type GetEventsByTypeInput = z.infer<typeof getEventsByTypeSchema>;

export const useEventQueries = () => {
  // Get all events
  const useAllEvents = (input: GetAllEventsInput = {}) => {
    const {
      data: events,
      isLoading,
      error,
    } = api.event.readAllEvents.useQuery(input);

    return { events, isLoading, error };
  };

  // Get single event
  const useEventById = (input: GetEventByIdInput) => {
    const {
      data: event,
      isLoading,
      error,
    } = api.event.readEventById.useQuery(input);

    return { event, isLoading, error };
  };

  // Get events by organiser
  const useEventsByOrganiser = (input: GetEventsByOrganiserInput) => {
    const {
      data: events,
      isLoading,
      error,
    } = api.event.readEventsByOrganiserId.useQuery(input);

    return { events, isLoading, error };
  };

  // Get events by location
  const useEventsByLocation = (input: GetEventsByLocationInput) => {
    const {
      data: events,
      isLoading,
      error,
    } = api.event.readEventsByLocationId.useQuery(input);

    return { events, isLoading, error };
  };

  // Get featured events
  const useFeaturedEvents = (input: GetFeaturedEventsInput = {}) => {
    const {
      data: events,
      isLoading,
      error,
    } = api.event.readFeaturedEvents.useQuery(input);

    return { events, isLoading, error };
  };

  // Get events by status
  const useEventsByStatus = (input: GetEventsByStatusInput) => {
    const {
      data: events,
      isLoading,
      error,
    } = api.event.readEventsByStatus.useQuery(input);

    return { events, isLoading, error };
  };

  // Get events by type
  const useEventsByType = (input: GetEventsByTypeInput) => {
    const {
      data: events,
      isLoading,
      error,
    } = api.event.readEventsByType.useQuery(input);

    return { events, isLoading, error };
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
