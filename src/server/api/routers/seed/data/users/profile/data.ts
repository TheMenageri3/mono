import {
  QuarterType,
  StatusType,
  Prisma,
  EmploymentType,
} from "@/generated/prisma";
export const TEST_PROFILES: Pick<
  Prisma.ProfileCreateInput,
  "firstName" | "lastName" | "email" | "phoneNumber"
>[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phoneNumber: "+12343437890",
  },
  {
    firstName: "Jim",
    lastName: "Beam",
    email: "jim.beam@example.com",
    phoneNumber: "+12345890",
  },
];

export const TEST_WORK_HISTORY: Omit<
  Prisma.WorkHistoryCreateInput,
  "createdBy" | "updatedBy" | "profile"
>[] = [
  {
    companyName: "Company 1",
    title: "Job Title 1",
    description: "Description 1",
    startDatetime: new Date("2020-01-01"),
    endDatetime: new Date("2021-01-01"),
    isCurrent: false,
    location: "Location 1",
    employmentType: EmploymentType.FULL_TIME,
    achievements: "Achievement 1",
    references: "Reference 1",
    verified: true,
  },
];
