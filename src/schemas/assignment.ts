import { z } from "zod";
import {
  AssignmentType,
  AssignmentStatus,
  SubmissionType,
} from "@/generated/prisma";

// Re-export your Prisma enums as runtime Zod enums
export const AssignmentTypeEnum = AssignmentType;
export const AssignmentStatusEnum = AssignmentStatus;
export const SubmissionTypeEnum = SubmissionType;

// (Optional) export the inferred TS type for convenience
export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;

export const createAssignmentSchema = z.object({
  title: z.string(),
  description: z.string(),
  type: z.nativeEnum(AssignmentType),
  status: z.nativeEnum(AssignmentStatus),
  submissionType: z.nativeEnum(SubmissionType),
  submissionInstructions: z.string(),
  pointsPossible: z.number().optional(),
  gradingRubric: z.object({}).optional(),
  releaseDate: z.string().datetime().optional(),
  dueDate: z.string().datetime().optional(),
  allowLateSubmissions: z.boolean().optional(),
  latePenalty: z.object({}).optional(),
  classId: z.string(),
});

export const deleteAssignmentSchema = z.object({ id: z.string() });
export const restoreAssignmentSchema = z.object({ id: z.string() });
export const getAssignmentByIdSchema = z.object({ id: z.string() });
export const getAssignmentsByClassSchema = z.object({ classId: z.string() });
export const getDeletedAssignmentsByClassSchema = z.object({
  classId: z.string(),
});
export const getAssignmentsByFilterSchema = z.object({
  classId: z.string().optional(),
  releaseDate: z.string().datetime().optional(),
  dueDate: z.string().datetime().optional(),
  includeDeleted: z.boolean().optional(),
});

export const updateAssignmentSchema = z.object({
  id: z.string(),
  data: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      type: z.nativeEnum(AssignmentType).optional(),
      status: z.nativeEnum(AssignmentStatus).optional(),
      submissionType: z.nativeEnum(SubmissionType).optional(),
      submissionInstructions: z.string().optional(),
      pointsPossible: z.number().optional(),
      gradingRubric: z.object({}).optional(),
      releaseDate: z.string().datetime().optional(),
      dueDate: z.string().datetime().optional(),
      allowLateSubmissions: z.boolean().optional(),
      latePenalty: z.object({}).optional(),
    })
    .optional(),
});
