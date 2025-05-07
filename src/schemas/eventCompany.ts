import { z } from "zod";
import { EventAttendanceStatus, EventAttendanceType } from "@/generated/prisma";

//create
export const createEventCompanySchema = z.object({
  attendanceStatus: z.nativeEnum(EventAttendanceStatus),
  attendanceType: z.nativeEnum(EventAttendanceType),
  notes: z.string().optional(),
  feedback: z.string().optional(),
  eventId: z.string(),
  companyId: z.string(),
});

//read
export const getEventCompanyByIdSchema = z.object({
  id: z.string(),
});
export const getEventCompaniesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getEventCompanyByCompanyIdSchema = z.object({
  companyId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getEventCompaniesByEventIdSchema = z.object({
  eventId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getEventCompanyByAttendanceStatusSchema = z.object({
  attendanceStatus: z.nativeEnum(EventAttendanceStatus),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getEventCompanyByAttendanceTypeSchema = z.object({
  attendanceType: z.nativeEnum(EventAttendanceType),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getDeletedEventCompaniesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateEventCompanySchema = z.object({
  id: z.string(),
  attendanceStatus: z.nativeEnum(EventAttendanceStatus).optional(),
  attendanceType: z.nativeEnum(EventAttendanceType).optional(),
  notes: z.string().optional(),
  feedback: z.string().optional(),
  eventId: z.string().optional(),
  companyId: z.string().optional(),
});

//delete
export const deleteEventCompanySchema = z.object({ id: z.string() });
export const restoreEventCompanySchema = z.object({ id: z.string() });
