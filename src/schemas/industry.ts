import { z } from "zod";

//create
export const createIndustrySchema = z.object({
  name: z.string(),
  description: z.string(),
  parentIndustryId: z.string().optional(),
});

//read
export const readIndustriesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getIndustryByIdSchema = z.object({ id: z.string() });
export const readDeletedIndustriesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateIndustrySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  parentIndustryId: z.string().optional().nullable(),
});

//delete
export const deleteIndustrySchema = z.object({ id: z.string() });
export const restoreIndustrySchema = z.object({ id: z.string() });
