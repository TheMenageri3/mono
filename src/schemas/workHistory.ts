import { z } from "zod";
import { EmploymentType } from "@/generated/prisma";

//create
export const createWorkHistorySchema = z
  .object({
    companyName: z.string(),
    title: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    isCurrent: z.boolean(),
    location: z.string(),
    employmentType: z.nativeEnum(EmploymentType),
    achievements: z.string().optional(),
    references: z.string().optional(),
    verified: z.boolean(),
    profileId: z.string(),
  })
  .refine(
    (data) => {
      // Enforce correct relationship between endDate and isCurrent
      if (data.isCurrent) return !data.endDate;
      return !!data.endDate;
    },
    {
      message:
        "If the job is current, end date must be empty. If it's not current, end date is required.",
      path: ["endDate"],
    }
  );

//read
export const getWorkHistoryByIdSchema = z.object({ id: z.string() });
export const readWorkHistorySchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});
export const readDeletedWorkHistorySchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

//update
export const updateWorkHistorySchema = z.object({
  id: z.string(),
  companyName: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().nullable().optional(),
  isCurrent: z.boolean().optional(),
  location: z.string().optional(),
  employmentType: z.nativeEnum(EmploymentType).optional(),
  achievements: z.string().optional(),
  references: z.string().optional(),
  verified: z.boolean().optional(),
});

//delete
export const deleteWorkHistorySchema = z.object({ id: z.string() });
export const restoreWorkHistorySchema = z.object({ id: z.string() });
