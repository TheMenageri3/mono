import { z } from "zod";
import { ClassApplicationResponseStatus } from "@/generated/prisma";

//create
export const createClassApplicationResponseSchema = z.object({
  status: z.nativeEnum(ClassApplicationResponseStatus),
  submittedAt: z.string().datetime().optional(),
  reviewedAt: z.string().datetime().optional(),
  feedback: z.string().optional(),
  classApplicationId: z.string(),
  applicantId: z.string(),
  reviewedById: z.string().optional(),
});

//read
export const getClassApplicationResponseByIdSchema = z.object({
  id: z.string(),
});
export const getClassApplicationResponsesByClassApplicationSchema = z.object({
  classApplicationId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getClassApplicationResponseByApplicantSchema = z.object({
  applicantId: z.string(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const getClassApplicationResponsesSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateClassApplicationResponseSchema = z.object({
  id: z.string(),
  data: z.object({
    status: z.nativeEnum(ClassApplicationResponseStatus).optional(),
    submittedAt: z.string().datetime().optional(),
    reviewedAt: z.string().datetime().optional(),
    feedback: z.string().optional(),
    reviewedById: z.string().optional(),
  }),
});

//delete
export const deleteClassApplicationResponseSchema = z.object({
  id: z.string(),
});
export const restoreClassApplicationResponseSchema = z.object({
  id: z.string(),
});
