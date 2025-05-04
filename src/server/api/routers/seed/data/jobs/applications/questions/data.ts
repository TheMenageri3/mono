// Project collaboration test data will go here
import { Prisma } from "@/generated/prisma";
export const TEST_JOB_APPLICATION_QUESTIONS: Omit<
  Prisma.JobApplicationQuestionCreateInput,
  "createdBy" | "updatedBy" | "jobApplication" | "question"
>[] = [
  {
    order: 1,
    required: true,
    points: 10,
    section: "Personal Information",
  },
];
