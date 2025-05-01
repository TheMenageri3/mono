import { z } from "zod";
import { LocationType } from "@/generated/prisma";

//create
export const createLocationSchema = z.object({
  name: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  stateProvince: z.string(),
  postalCode: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  type: z.nativeEnum(LocationType),
  capacity: z.number().optional(),
  notes: z.string().optional(),
});

//read
export const readLocationsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedLocationsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getLocationByIdSchema = z.object({ id: z.string() });

//update
export const updateLocationSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  stateProvince: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  type: z.nativeEnum(LocationType).optional(),
  capacity: z.number().optional(),
  notes: z.string().optional(),
});

//delete
export const deleteLocationSchema = z.object({ id: z.string() });
export const restoreLocationSchema = z.object({ id: z.string() });
