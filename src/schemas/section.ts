import { z } from "zod";

//create
export const createSectionSchema = z.object({
  header: z.string(),
  metadata: z.record(z.any()),
});

//read
export const readSectionsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getSectionByIdSchema = z.object({ id: z.string() });
export const readDeletedSectionsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateSectionSchema = z.object({
  id: z.string(),
  header: z.string().optional(),
  metadata: z.record(z.any()).optional(),
});

//delete
export const deleteSectionSchema = z.object({ id: z.string() });
export const restoreSectionSchema = z.object({ id: z.string() });
