import { z } from "zod";
import { ApplicationStatus } from "@/generated/prisma";

//create
export const createClassApplicationSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(ApplicationStatus),
  startDate: z.date(),
  endDate: z.date(),
  classId: z.string(),
  publisherId: z.string().optional(),
});

//read
export const getClassApplicationsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getClassApplicationByIdSchema = z.object({ id: z.string() });
export const getClassApplicationsByClassSchema = z.object({
  classId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getClassApplicationsByFilterSchema = z.object({
  classId: z.string().optional(),
  status: z.nativeEnum(ApplicationStatus).optional(),
  includeDeleted: z.boolean().optional(),
  startDate: z.date().optional(),
  startDateExact: z.boolean().optional().default(false),
  endDate: z.date().optional(),
  endDateExact: z.boolean().optional().default(false),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getDeletedClassApplicationsByClassSchema = z.object({
  classId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateClassApplicationSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(ApplicationStatus).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

//delete
export const deleteClassApplicationSchema = z.object({ id: z.string() });
export const restoreClassApplicationSchema = z.object({ id: z.string() });
