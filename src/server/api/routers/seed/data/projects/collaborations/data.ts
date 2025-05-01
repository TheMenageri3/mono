// Project collaboration test data will go here
import { QuarterType, StatusType, Prisma } from "@/generated/prisma";
export const TEST_PROJECT_COLLABORATIONS: Omit<
  Prisma.ProjectCollaboratorCreateInput,
  "createdBy" | "updatedBy" | "project" | "user"
>[] = [
  {
    role: "Developer",
    contributions: "Developed the frontend and backend of the project",
  },
];
