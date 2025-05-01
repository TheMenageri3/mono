import { z } from "zod";
import {
  InterviewLocationType,
  InterviewStatus,
  InterviewType,
} from "@/generated/prisma";

//create
export const createInterviewSchema = z.object({
  type: z.nativeEnum(InterviewType),
  scheduledDate: z.string().datetime(),
  durationMinutes: z.number(),
  interviewLocationType: z.nativeEnum(InterviewLocationType),
  preparationNotes: z.string().optional(),
  status: z.nativeEnum(InterviewStatus),
  feedback: z.string().optional(),
  candidateFeedback: z.string().optional(),
  nextSteps: z.string().optional(),
  intervieweeId: z.string(),
  jobApplicationId: z.string(),
  companyContactId: z.string().optional(),
});

//read
export const readInterviewsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedInterviewsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getInterviewByIdSchema = z.object({ id: z.string() });
export const getInterviewByDataSchema = z.object({
  type: z.nativeEnum(InterviewType).optional(),
  scheduledDate: z.string().datetime().optional(),
  durationMinutes: z.number().optional(),
  interviewLocationType: z.nativeEnum(InterviewLocationType).optional(),
  preparationNotes: z.string().optional(),
  status: z.nativeEnum(InterviewStatus).optional(),
  feedback: z.string().optional(),
  candidateFeedback: z.string().optional(),
  nextSteps: z.string().optional(),
  intervieweeId: z.string().optional(),
  jobApplicationId: z.string().optional(),
  companyContactId: z.string().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateInterviewSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(InterviewType).optional(),
  scheduledDate: z.string().datetime().optional(),
  durationMinutes: z.number().optional(),
  interviewLocationType: z.nativeEnum(InterviewLocationType).optional(),
  preparationNotes: z.string().optional(),
  status: z.nativeEnum(InterviewStatus).optional(),
  feedback: z.string().optional(),
  candidateFeedback: z.string().optional(),
  nextSteps: z.string().optional(),
  intervieweeId: z.string().optional(),
  jobApplicationId: z.string().optional(),
  companyContactId: z.string().optional(),
});

//delete
export const deleteInterviewSchema = z.object({ id: z.string() });
export const restoreInterviewSchema = z.object({ id: z.string() });
