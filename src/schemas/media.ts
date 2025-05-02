import { z } from "zod";
import { MediaType, StorageType } from "@/generated/prisma";

//create
export const createMediaSchema = z.object({
  title: z.string(),
  type: z.nativeEnum(MediaType),
  storageType: z.nativeEnum(StorageType),
  url: z.string(),
  originalFilename: z.string().optional(),
  sizeInBytes: z.number().optional(),
  mimeType: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  profileId: z.string().optional(),
  companyId: z.string().optional(),
});

//read
export const readMediasSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedMediasSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getMediaByIdSchema = z.object({ id: z.string() });

//update
export const updateMediaSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  type: z.nativeEnum(MediaType).optional(),
  storageType: z.nativeEnum(StorageType).optional(),
  url: z.string().optional(),
  originalFilename: z.string().optional(),
  sizeInBytes: z.number().optional(),
  mimeType: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  profileId: z.string().optional(),
  companyId: z.string().optional(),
});

//delete
export const deleteMediaSchema = z.object({ id: z.string() });
export const restoreMediaSchema = z.object({ id: z.string() });
