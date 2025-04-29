import { z } from "zod";

//create
export const createProjectCollaboratorSchema = z.object({
  role: z.string(),
  contributions: z.string(),
  userId: z.string(),
  projectId: z.string(),
  profileId: z.string(),
});

//read
export const readProjectCollaboratorSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedProjectCollaboratorSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getProjectCollaboratorByIdSchema = z.object({ id: z.string() });
export const getProjectCollaboratorByProjectIdSchema = z.object({
  projectId: z.string(),
});
export const getProjectCollaboratorByUserIdSchema = z.object({
  userId: z.string(),
});
export const getProjectCollaboratorByDataSchema = z.object({
  role: z.string().optional(),
  contributions: z.string().optional(),
  userId: z.string().optional(),
  projectId: z.string().optional(),
  profileId: z.string().optional(),
});

//update
export const updateProjectCollaboratorSchema = z.object({
  id: z.string().optional(),
  role: z.string().optional(),
  contributions: z.string().optional(),
  userId: z.string().optional(),
  projectId: z.string().optional(),
  profileId: z.string().optional(),
});

//delete
export const deleteProjectCollaboratorSchema = z.object({ id: z.string() });
export const restoreProjectCollaboratorSchema = z.object({ id: z.string() });
