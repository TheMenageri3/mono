import { z } from "zod";

//create
export const createUserSkillSchema = z.object({
  tagName: z.string(),
  selfRating: z.number().min(0).max(5).optional(),
  notes: z.string().optional(),
  profileId: z.string(),
});

//read
export const readUserSkillsByProfileIdSchema = z.object({
  profileId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedUserSkillsByProfileIdSchema = z.object({
  profileId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readUserSkillByIdSchema = z.object({ id: z.string() });
export const readUserSkillsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedUserSkillsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateUserSkillSchema = z.object({
  id: z.string(),
  tagName: z.string().optional(),
  selfRating: z.number().min(0).max(5).optional(),
  notes: z.string().optional(),
  profileId: z.string().optional(),
});

//delete
export const deleteUserSkillSchema = z.object({ id: z.string() });
export const restoreUserSkillSchema = z.object({ id: z.string() });
