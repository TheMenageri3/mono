import { z } from "zod";
import { ProjectStatus, VisibilityStatus } from "@/generated/prisma";

//create
export const createProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  status: z.nativeEnum(ProjectStatus),
  visibility: z.nativeEnum(VisibilityStatus),
  githubUrl: z.string().url(),
  demoUrl: z.string().url(),
  outcome: z.string(),
  challenges: z.string(),
  isFeatured: z.boolean(),
  startDatetime: z.string().datetime(),
  endDatetime: z.string().datetime(),
});

//read
export const readProjectsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedProjectsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getProjectByIdSchema = z.object({ id: z.string() });
export const getProjectsByDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  status: z.nativeEnum(ProjectStatus).optional(),
  visibility: z.nativeEnum(VisibilityStatus).optional(),
  githubUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  outcome: z.string().optional(),
  challenges: z.string().optional(),
  isFeatured: z.boolean().optional(),
  startDatetime: z.date().optional(),
  endDatetime: z.date().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateProjectSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  status: z.nativeEnum(ProjectStatus).optional(),
  visibility: z.nativeEnum(VisibilityStatus).optional(),
  githubUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
  outcome: z.string().optional(),
  challenges: z.string().optional(),
  isFeatured: z.boolean().optional(),
  startDatetime: z.string().datetime().optional(),
  endDatetime: z.string().datetime().optional(),
});

//delete
export const deleteProjectSchema = z.object({ id: z.string() });
export const restoreProjectSchema = z.object({ id: z.string() });
