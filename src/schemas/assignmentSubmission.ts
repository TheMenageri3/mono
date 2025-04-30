import { z } from "zod";
import { SubmissionStatus } from "@/generated/prisma";
//create
export const createAssignmentSubmissionSchema = z.object({
  status: z.nativeEnum(SubmissionStatus),
  submissionText: z.string().optional(),
  submissionUrl: z.string().optional(),
  submittedAt: z.string().datetime().optional(),
  gradedAt: z.string().datetime().optional(),
  score: z.number().optional(),
  feedback: z.string().optional(),
  gradedById: z.string().optional(),
  submitterId: z.string().optional(),
  assignmentId: z.string(),
});

//read
export const getAssignmentSubmissionByIdSchema = z.object({ id: z.string() });
export const readAssignmentSubmissionsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateAssignmentSubmissionSchema = z.object({
  id: z.string(),
  data: z.object({
    status: z.nativeEnum(SubmissionStatus).optional(),
    submissionText: z.string().optional(),
    submissionUrl: z.string().optional(),
    gradedAt: z.string().datetime().optional(),
    score: z.number().optional(),
    feedback: z.string().optional(),
    gradedById: z.string().optional(),
  }),
});

//delete
export const deleteAssignmentSubmissionSchema = z.object({ id: z.string() });
export const restoreAssignmentSubmissionSchema = z.object({ id: z.string() });
