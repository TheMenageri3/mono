import { api, RouterInputs } from "@/trpc/react";
import type { z } from "zod";
import {
  getEventAttendeeByIdSchema,
  getEventAttendeesByEventIdSchema,
  getEventAttendeesByStatusSchema,
  getEventAttendeesByTypeSchema,
  getDeletedEventAttendeesSchema,
} from "@/schemas";

// Type inference from schemas
type GetEventAttendeeByIdInput = z.infer<typeof getEventAttendeeByIdSchema>;
type GetEventAttendeesByEventIdInput = z.infer<
  typeof getEventAttendeesByEventIdSchema
>;
type GetEventAttendeesByStatusInput = z.infer<
  typeof getEventAttendeesByStatusSchema
>;
type GetEventAttendeesByTypeInput = z.infer<
  typeof getEventAttendeesByTypeSchema
>;
type GetDeletedEventAttendeesInput = z.infer<
  typeof getDeletedEventAttendeesSchema
>;

export const useEventAttendeeQueries = () => {
  const useEventAttendeeById = (input: GetEventAttendeeByIdInput) => {
    return api.eventAttendee.getById.useQuery(input);
  };

  const useEventAttendeesByEventId = (
    input: GetEventAttendeesByEventIdInput = {
      eventId: "",
      limit: 10,
      offset: 0,
    }
  ) => {
    return api.eventAttendee.getByEventId.useQuery(input);
  };

  const useEventAttendeesByStatus = (
    input: GetEventAttendeesByStatusInput = {
      status: "ATTENDING",
      limit: 10,
      offset: 0,
    }
  ) => {
    return api.eventAttendee.getByStatus.useQuery(input);
  };

  const useEventAttendeesByType = (
    input: GetEventAttendeesByTypeInput = {
      type: "ATTENDEE",
      limit: 10,
      offset: 0,
    }
  ) => {
    return api.eventAttendee.getByType.useQuery(input);
  };

  const useDeletedEventAttendees = (
    input: GetDeletedEventAttendeesInput = { limit: 10, offset: 0 }
  ) => {
    return api.eventAttendee.getDeleted.useQuery(input);
  };

  return {
    useEventAttendeeById,
    useEventAttendeesByEventId,
    useEventAttendeesByStatus,
    useEventAttendeesByType,
    useDeletedEventAttendees,
  };
};
