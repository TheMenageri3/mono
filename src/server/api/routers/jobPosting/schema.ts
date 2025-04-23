import { z } from "zod";

export const baseJobPostingSchema = z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    location: z.string(),
    remoteOption: z.enum(['ON_SITE', 'HYBRID', 'REMOTE']),
    employmentType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP']),
    experienceLevel: z.enum(['ENTRY', 'MID', 'SENIOR', 'EXECUTIVE']),
    educationRequirements: z.string().nullable().optional(),
    salaryMin: z.number().nullable().optional(),
    salaryMax: z.number().nullable().optional(),
    benefits: z.string().nullable().optional(),
    applicationInstructions: z.string().nullable().optional(),
    externalPostingUrl: z.string().url().nullable().optional(),
    internalNotes: z.string().nullable().optional(),
    status: z.enum(['DRAFT', 'OPEN', 'FILLED', 'CLOSED']).optional(),
    postedDate: z.date().optional(),
    deadlineDate: z.date().optional(),
    hiringManagerId: z.string().optional(),
    companyId: z.string().optional(),
    industryIds: z.array(z.string()).optional(),
  });

  export const updateJobPosingSchema = baseJobPostingSchema
  .partial()
  .extend({
    jobPostingId: z.string(),
  });