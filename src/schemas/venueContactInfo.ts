import { z } from "zod";

// Create
export const createVenueContactInfoSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  contactName: z.string().optional(),
  department: z.string().optional(),
  locationId: z.string(),
});

// Read
export const readVenueContactInfoByIdSchema = z.object({
  id: z.string(),
});
export const readVenueContactInfosSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedVenueContactInfosSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

// Update
export const updateVenueContactInfoSchema = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  contactName: z.string().optional(),
  department: z.string().optional(),
  locationId: z.string().optional(),
});

// Delete / Restore
export const deleteVenueContactInfoSchema = z.object({ id: z.string() });
export const restoreVenueContactInfoSchema = z.object({ id: z.string() });
