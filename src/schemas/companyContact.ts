import { z } from "zod";
import { EngagementLevel } from "@/generated/prisma";

//create
export const createCompanyContactSchema = z.object({
  title: z.string(),
  department: z.string().optional(),
  isPrimary: z.boolean().optional().default(false),
  engagementLevel: z
    .nativeEnum(EngagementLevel)
    .optional()
    .default(EngagementLevel.PASSIVE),
  lastContactDate: z.date().optional(),
  notes: z.string().optional(),
  companyId: z.string(),
  userId: z.string(),
  profileId: z.string().optional(),
});

//read
export const readCompanyContactsByCompanyIdSchema = z.object({
  companyId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedCompanyContactsByCompanyIdSchema = z.object({
  companyId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readCompanyContactsByUserIdSchema = z.object({
  userId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readCompanyContactsByProfileIdSchema = z.object({
  profileId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readCompanyContactByIdSchema = z.object({ id: z.string() });
export const readCompanyContactsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedCompanyContactsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateCompanyContactSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  department: z.string().optional(),
  isPrimary: z.boolean().optional(),
  engagementLevel: z.nativeEnum(EngagementLevel).optional(),
  lastContactDate: z.date().optional(),
  notes: z.string().optional(),
  companyId: z.string().optional(),
  userId: z.string().optional(),
  profileId: z.string().optional(),
});

//delete
export const deleteCompanyContactSchema = z.object({ id: z.string() });
export const restoreCompanyContactSchema = z.object({ id: z.string() });
