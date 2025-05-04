// Project collaboration test data will go here
import { Prisma } from "@/generated/prisma";
export const TEST_JOB_APPLICATION_ANSWERS: Omit<
  Prisma.AnswerCreateInput,
  | "createdBy"
  | "updatedBy"
  | "jobApplication"
  | "question"
  | "answer"
  | "answerer"
>[] = [
  {
    value: "John Doe",
  },
];
