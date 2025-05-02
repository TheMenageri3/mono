import { z } from "zod";

//create
export const createTagSchema = z.object({
  tagName: z.string(),
  color: z.string(),
});

//read
export const readTagsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getTagByNameSchema = z.object({ tagName: z.string() });
export const readDeletedTagsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//udpate
export const updateTagSchema = z.object({
  tagName: z.string(),
  color: z.string().optional(),
});

//delete
export const deleteTagSchema = z.object({
  tagName: z.string(),
});
export const restoreTagSchema = z.object({ tagName: z.string() });
