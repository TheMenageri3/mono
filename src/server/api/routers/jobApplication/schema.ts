import { z } from "zod";

// Input Schemas
export const createJobApplicationSchema = z.object({
  coverLetter: z.string().optional(),
  additionalMaterialsIds: z.array(z.string()).optional(),
  status: z
    .enum([
      "DRAFT",
      "SUBMITTED",
      "UNDER_REVIEW",
      "INTERVIEWING",
      "OFFERED",
      "ACCEPTED",
      "DECLINED",
      "REJECTED",
    ])
    .optional(),
  referralSource: z.string().optional(),
  submissionDate: z.date().optional(),
  withdrawnDate: z.date().optional(),
  withdrawnReason: z.string().optional(),
  internalNotes: z.string().optional(),
  referralProfileId: z.string().optional(),
  jobPostingId: z.string(),
  resumeId: z.string(),
});

export const updateJobApplicationSchema = createJobApplicationSchema
  .omit({
    jobPostingId: true,
    referralProfileId: true,
  })
  .partial()
  .extend({
    jobApplicationId: z.string(),
  });
