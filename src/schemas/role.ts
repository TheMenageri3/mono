import { z } from "zod";
import { RoleCategory, RoleLevel } from "@/generated/prisma";

//create
export const createRoleSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.nativeEnum(RoleCategory),
  department: z.string().optional(),
  level: z.nativeEnum(RoleLevel),
  isInternal: z.boolean(),
  profileId: z.string(),
  companyId: z.string(),
});

//read
export const readRolesByCompanyIdSchema = z.object({
  companyId: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readRolesByProfileIdSchema = z.object({
  profileId: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readRolesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedRolesSchemas = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateRoleSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.nativeEnum(RoleCategory).optional(),
  department: z.string().optional(),
  level: z.nativeEnum(RoleLevel).optional(),
  isInternal: z.boolean().optional(),
  profileId: z.string().optional(),
  companyId: z.string().optional(),
});

//delete
export const deleteRoleSchema = z.object({ id: z.string() });
export const restoreRoleSchema = z.object({ id: z.string() });
