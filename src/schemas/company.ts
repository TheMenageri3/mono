import { z } from "zod";
import { CompanySize } from "@/generated/prisma";

//create
export const createCompanySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  logoId: z.string().optional(),
  website: z.string().optional(),
  size: z.nativeEnum(CompanySize).optional(),
  foundedYear: z.number().int().optional(),
  headquarters: z.string().optional(),
  locations: z.array(z.string()).nonempty("At least one location is required"),
  missionStatement: z.string().optional(),
  benefits: z.string().optional(),
  culture: z.string().optional(),
  active: z.boolean(),
  notes: z.string().optional(),
});

//read
export const readCompanyByIdSchema = z.object({ id: z.string() });
export const readCompaniesSchema = z.object({
  active: z.boolean().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedCompaniesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readCompaniesByIndustrySchema = z.object({
  industry: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const searchCompaniesSchema = z.object({
  query: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateCompanySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  logoId: z.string().optional(),
  website: z.string().optional(),
  size: z.nativeEnum(CompanySize).optional(),
  foundedYear: z.number().int().optional(),
  headquarters: z.string().optional(),
  locations: z.array(z.string()).optional(),
  missionStatement: z.string().optional(),
  benefits: z.string().optional(),
  culture: z.string().optional(),
  active: z.boolean().optional(),
  notes: z.string().optional(),
});
export const addIndustryToCompanySchema = z.object({
  companyId: z.string(),
  industryTagName: z.string(),
});
export const removeIndustryFromCompanySchema = z.object({
  companyId: z.string(),
  industryTagName: z.string(),
});

//delete
export const deleteCompanySchema = z.object({ id: z.string() });
export const restoreCompanySchema = z.object({ id: z.string() });
