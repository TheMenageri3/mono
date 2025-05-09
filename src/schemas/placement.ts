import { z } from "zod";
import { EmploymentType, MatchQuality } from "@/generated/prisma";

//create
export const createPlacementSchema = z.object({
  jobTitle: z.string(),
  employmentType: z.nativeEnum(EmploymentType),
  startDatetime: z.date(),
  endDatetime: z.date().optional(),
  isCurrent: z.boolean(),
  salary: z.number(),
  compensationDetails: z.string().optional(),
  matchQuality: z.nativeEnum(MatchQuality),
  verified: z.boolean(),
  verificationDate: z.date().optional(),
  profileId: z.string(),
  placementFacilitatorId: z.string(),
  companyId: z.string(),
  jobApplicationId: z.string().optional(),
});

//read
export const readPlacementsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedPlacementsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getPlacementByIdSchema = z.object({
  id: z.string(),
});
export const getPlacementByDataSchema = z.object({
  jobTitle: z.string().optional(),
  employmentType: z.nativeEnum(EmploymentType).optional(),
  startDatetime: z.date().optional(),
  endDatetime: z.date().optional(),
  isCurrent: z.boolean().optional(),
  salary: z.number().optional(),
  compensationDetails: z.string().optional(),
  matchQuality: z.nativeEnum(MatchQuality).optional(),
  verified: z.boolean().optional(),
  verificationDate: z.date().optional(),
  profileId: z.string().optional(),
  placementFacilitatorId: z.string().optional(),
  companyId: z.string().optional(),
  jobApplicationId: z.string().optional(),
});

//update
export const updatePlacementSchema = z.object({
  id: z.string(),
  jobTitle: z.string().optional(),
  employmentType: z.nativeEnum(EmploymentType).optional(),
  startDatetime: z.date().optional(),
  endDatetime: z.date().optional(),
  isCurrent: z.boolean().optional(),
  salary: z.number().optional(),
  compensationDetails: z.string().optional(),
  matchQuality: z.nativeEnum(MatchQuality).optional(),
  verified: z.boolean().optional(),
  verificationDate: z.date().optional(),
  profileId: z.string().optional(),
  placementFacilitatorId: z.string().optional(),
  companyId: z.string().optional(),
  jobApplicationId: z.string().optional(),
});

//delete
export const deletePlacementSchema = z.object({ id: z.string() });
export const restorePlacementSchema = z.object({ id: z.string() });
