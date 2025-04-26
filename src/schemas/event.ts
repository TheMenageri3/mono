import { z } from "zod";
import { EventType, EventStatus } from "@/generated/prisma/client";
import { EVENT_TYPE_VALUES, EVENT_STATUS_VALUES } from "@/constants/enums";

export const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  type: z.nativeEnum(EventType),
  isVirtual: z.boolean(),
  virtualMeetingUrl: z.string().optional(),
  startDatetime: z.date(),
  endDatetime: z.date(),
  timezone: z.string(),
  registrationRequired: z.boolean(),
  registrationUrl: z.string().optional(),
  registrationDeadline: z.date().optional(),
  capacity: z.number().optional(),
  cost: z.number().optional(),
  status: z.nativeEnum(EventStatus),
  featured: z.boolean(),
  organizerId: z.string(),
  locationId: z.string(),
  parentEventId: z.string().optional(),
});

// This is the schema for the client side
export const createEventSchemaClient = createEventSchema
  .omit({
    type: true,
    status: true,
  })
  .extend({
    type: z.enum(EVENT_TYPE_VALUES),
    status: z.enum(EVENT_STATUS_VALUES),
  });

export const deleteEventSchema = z.object({ id: z.string() });

export const restoreEventSchema = z.object({ id: z.string() });

export const getAllEventsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const getEventByIdSchema = z.object({
  id: z.string(),
});

export const getEventsByOrganiserIdSchema = z.object({
  organizerId: z.string(),
});

export const getEventsByLocationIdSchema = z.object({
  locationId: z.string(),
});

export const getFeaturedEventsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const getEventByStatusSchema = z.object({
  status: z.nativeEnum(EventStatus),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const getEventsByTypeSchema = z.object({
  type: z.nativeEnum(EventType),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export const updateEventSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  type: z.nativeEnum(EventType).optional(),
  isVirtual: z.boolean().optional(),
  virtualMeetingUrl: z.string().optional(),
  startDatetime: z.date().optional(),
  endDatetime: z.date().optional(),
  timezone: z.string().optional(),
  registrationRequired: z.boolean().optional(),
  registrationUrl: z.string().optional(),
  registrationDeadline: z.date().optional(),
  capacity: z.number().optional(),
  cost: z.number().optional(),
  status: z.nativeEnum(EventStatus).optional(),
  featured: z.boolean().optional(),
  organizerId: z.string().optional(),
  locationId: z.string().optional(),
  parentEventId: z.string().optional(),
});
