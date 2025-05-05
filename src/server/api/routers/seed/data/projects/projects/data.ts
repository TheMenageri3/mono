// Project test data will go here
import { ProjectStatus, VisibilityStatus, Prisma } from "@/generated/prisma";

export const TEST_PROJECTS: Omit<
  Prisma.ProjectCreateInput,
  "createdBy" | "updatedBy"
>[] = [
  {
    title: "Project 1",
    description: "Project 1 description",
    shortDescription: "Project 1 short description",
    status: ProjectStatus.IN_PROGRESS,
    startDatetime: new Date("2024-01-01"),
    endDatetime: new Date("2024-01-01"),
    visibility: VisibilityStatus.PUBLIC,
  },
  {
    title: "Project 2",
    description: "Project 2 description",
    shortDescription: "Project 2 short description",
    status: ProjectStatus.IN_PROGRESS,
    startDatetime: new Date("2024-01-01"),
    visibility: VisibilityStatus.PUBLIC,
  },
  {
    title: "Project 3",
    description: "Project 3 description",
    shortDescription: "Project 3 short description",
    status: ProjectStatus.IN_PROGRESS,
    visibility: VisibilityStatus.PUBLIC,
    startDatetime: new Date("2024-01-01"),
  },
];
