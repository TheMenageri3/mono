import { z } from "zod";
import { EnrollmentStatus } from "@/generated/prisma";

//create
export const createEnrollemntSchema = z.object({
  status: z.nativeEnum(EnrollmentStatus),
  enrollmentDate: z.string().datetime().optional(),
  completionDate: z.string().datetime().optional(),
  finalGrade: z.number().optional(),
  studentId: z.string(),
  classId: z.string().optional(),
});

//read
export const getEnrollmentByIdSchema = z.object({ id: z.string() });
export const readEnrollmentsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateEnrollmentSchema = z.object({
  id: z.string(),
  data: z.object({
    status: z.nativeEnum(EnrollmentStatus).optional(),
    completionDate: z.string().datetime().optional(),
    finalGrade: z.number().optional(),
    classId: z.string().optional(),
  }),
});

//delete
export const deleteEnrollmentSchema = z.object({ id: z.string() });
export const restoreEnrollmentSchema = z.object({ id: z.string() });
