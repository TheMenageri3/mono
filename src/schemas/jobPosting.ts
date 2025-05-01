import { z } from "zod";
import {
  JobPostingRemoteOption,
  JobPostingEmploymentType,
  JobPostingExperienceLevel,
  JobPostingStatus,
} from "@/generated/prisma";

//create
export const createJobPostingSchema = z.object({
  title: z.string(),
  description: z.string(),
  shortDescription: z.string(),
  location: z.string(),
  remoteOption: z.nativeEnum(JobPostingRemoteOption),
  employmentType: z.nativeEnum(JobPostingEmploymentType),
  experienceLevel: z.nativeEnum(JobPostingExperienceLevel),
  educationRequirements: z.string().nullable().optional(),
  salaryMin: z.number().nullable().optional(),
  salaryMax: z.number().nullable().optional(),
  benefits: z.string().nullable().optional(),
  applicationInstructions: z.string().nullable().optional(),
  externalPostingUrl: z.string().url().nullable().optional(),
  internalNotes: z.string().nullable().optional(),
  status: z.nativeEnum(JobPostingStatus).optional(),
  postedDate: z.date().optional(),
  deadlineDate: z.date().optional(),
  hiringManagerId: z.string(),
  companyId: z.string(),
  industryIds: z.array(z.string()),
});

//read
export const getJobPostingByIdSchema = z.object({
  id: z.string(),
});
export const readJobPostingsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedJobPostingsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateJobPostingSchema = z.object({
  jobPostingId: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  location: z.string().optional(),
  remoteOption: z.nativeEnum(JobPostingRemoteOption).optional(),
  employmentType: z.nativeEnum(JobPostingEmploymentType).optional(),
  experienceLevel: z.nativeEnum(JobPostingExperienceLevel).optional(),
  educationRequirements: z.string().nullable().optional(),
  salaryMin: z.number().nullable().optional(),
  salaryMax: z.number().nullable().optional(),
  benefits: z.string().nullable().optional(),
  applicationInstructions: z.string().nullable().optional(),
  externalPostingUrl: z.string().url().nullable().optional(),
  internalNotes: z.string().nullable().optional(),
  status: z.nativeEnum(JobPostingStatus).optional(),
  postedDate: z.date().optional(),
  deadlineDate: z.date().optional(),
  hiringManagerId: z.string().optional(),
  companyId: z.string().optional(),
  industryIds: z.array(z.string()).optional(),
});

//delete
export const deleteJobPostingSchema = z.object({ id: z.string() });
export const restoreJobPostingSchema = z.object({ id: z.string() });
