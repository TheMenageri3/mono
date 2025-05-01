import { z } from "zod";
import { EventAttendanceStatus, EventAttendanceType } from "@/generated/prisma";

//create
export const createEventAttendeeSchema = z.object({
  attendanceStatus: z.nativeEnum(EventAttendanceStatus),
  attendanceType: z.nativeEnum(EventAttendanceType),
  notes: z.string().optional(),
  feedback: z.string().optional(),
  attendeeId: z.string(),
  eventId: z.string(),
});

//read
export const getEventAttendeeByIdSchema = z.object({
  id: z.string(),
});
export const getEventAttendeesByEventIdSchema = z.object({
  eventId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getEventAttendeesByStatusSchema = z.object({
  status: z.nativeEnum(EventAttendanceStatus),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getEventAttendeesByTypeSchema = z.object({
  type: z.nativeEnum(EventAttendanceType),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getDeletedEventAttendeesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateEventAttendeeSchema = z.object({
  id: z.string(),
  attendanceStatus: z.nativeEnum(EventAttendanceStatus).optional(),
  attendanceType: z.nativeEnum(EventAttendanceType).optional(),
  notes: z.string().optional(),
  feedback: z.string().optional(),
  attendeeId: z.string(),
  eventId: z.string(),
});

//delete
export const deleteEventAttendeeSchema = z.object({ id: z.string() });
export const restoreEventAttendeeSchema = z.object({ id: z.string() });
