import { z } from "zod";
import { ApplicationStatus } from "@/generated/prisma";

//create
export const createClassApplicationSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(ApplicationStatus),
  startDatetime: z.date(),
  endDatetime: z.date(),
  classId: z.string().uuid("Invalid UUID format"),
  publisherId: z.string().uuid("Invalid UUID format").optional(),
});

//read
export const getClassApplicationsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getClassApplicationByIdSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
});
export const getClassApplicationsByFilterSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(ApplicationStatus).optional(),
  startDatetime: z.date().optional(),
  endDatetime: z.date().optional(),
  classId: z.string().uuid("Invalid UUID format").optional(),
  publisherId: z.string().uuid("Invalid UUID format").optional(),
  includeDeleted: z.boolean().default(false).optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getDeletedClassApplicationsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateClassApplicationSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(ApplicationStatus).optional(),
  startDatetime: z.date().optional(),
  endDatetime: z.date().optional(),
  classId: z.string().uuid("Invalid UUID format").optional(),
  publisherId: z.string().uuid("Invalid UUID format").optional(),
});

//delete
export const deleteClassApplicationSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
});
export const restoreClassApplicationSchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
});
