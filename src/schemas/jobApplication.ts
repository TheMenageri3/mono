import { z } from "zod";
import { JobApplicationStatus } from "@/generated/prisma";

//create
export const createJobApplicationSchema = z.object({
  coverLetter: z.string().optional(),
  additionalMaterialsIds: z.array(z.string()).optional(),
  status: z.nativeEnum(JobApplicationStatus).optional(),
  referralSource: z.string().optional(),
  submissionDate: z.date().optional(),
  withdrawnDate: z.date().optional(),
  withdrawnReason: z.string().optional(),
  internalNotes: z.string().optional(),
  referralProfileId: z.string().optional(),
  jobPostingId: z.string(),
  resumeId: z.string(),
});

//read
export const getJobApplicationByIdSchema = z.object({
  id: z.string(),
});
export const readAllJobApplicationsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedJobApplicationsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateJobApplicationSchema = z.object({
  jobApplicationId: z.string(),
  coverLetter: z.string().optional(),
  additionalMaterialsIds: z.array(z.string()).optional(),
  status: z.nativeEnum(JobApplicationStatus).optional(),
  referralSource: z.string().optional(),
  submissionDate: z.date().optional(),
  withdrawnDate: z.date().optional(),
  withdrawnReason: z.string().optional(),
  internalNotes: z.string().optional(),
  referralProfileId: z.string().optional(),
  jobPostingId: z.string(),
  resumeId: z.string(),
});

//delete
export const deleteJobApplicationSchema = z.object({ id: z.string() });
export const restoreJobApplicationSchema = z.object({ id: z.string() });
