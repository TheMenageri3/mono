import { z } from "zod";
import { QuarterType, StatusType } from "@/generated/prisma";

//create
export const createClassSchema = z.object({
  title: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  year: z.number(),
  quarter: z.nativeEnum(QuarterType),
  status: z.nativeEnum(StatusType),
  startDatetime: z.string().datetime(),
  endDatetime: z.string().datetime(),
  enrollmentCapacity: z.number(),
  syllabusUrl: z.string().url(),
  meetingSchedule: z.any(),
  location: z.string(),
});

//read
export const readClassesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedClassesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getClassByIdSchema = z.object({ id: z.string() });
export const getClassesByDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  year: z.number().optional(),
  quarter: z.nativeEnum(QuarterType).optional(),
  status: z.nativeEnum(StatusType).optional(),
  startDatetime: z.string().datetime().optional(),
  endDatetime: z.string().datetime().optional(),
  enrollmentCapacity: z.number().optional(),
  syllabusUrl: z.string().url().optional(),
  meetingSchedule: z.any().optional(),
  location: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateClassSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  year: z.number().optional(),
  quarter: z.nativeEnum(QuarterType).optional(),
  status: z.nativeEnum(StatusType).optional(),
  startDatetime: z.string().datetime().optional(),
  endDatetime: z.string().datetime().optional(),
  enrollmentCapacity: z.number().optional(),
  syllabusUrl: z.string().url().optional(),
  meetingSchedule: z.any().optional(),
  location: z.string().optional(),
});

//delete
export const deleteClassSchema = z.object({ id: z.string() });
export const restoreClassSchema = z.object({ id: z.string() });
