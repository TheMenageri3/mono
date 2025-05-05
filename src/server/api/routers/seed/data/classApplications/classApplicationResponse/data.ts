import { ClassApplicationResponseStatus } from "@/generated/prisma";

export const TEST_CLASS_APPLICATION_RESPONSES = [
  {
    status: ClassApplicationResponseStatus.DRAFT,
    submittedAt: null,
    reviewedAt: null,
    feedback: null,
  },
  {
    status: ClassApplicationResponseStatus.SUBMITTED,
    submittedAt: new Date("2024-03-15T10:30:00Z"),
    reviewedAt: null,
    feedback: null,
  },
  {
    status: ClassApplicationResponseStatus.UNDER_REVIEW,
    submittedAt: new Date("2024-03-10T14:20:00Z"),
    reviewedAt: new Date("2024-03-12T09:15:00Z"),
    feedback:
      "Application is currently being reviewed by the admissions committee.",
  },
  {
    status: ClassApplicationResponseStatus.ACCEPTED,
    submittedAt: new Date("2024-03-05T16:45:00Z"),
    reviewedAt: new Date("2024-03-08T11:30:00Z"),
    feedback:
      "Congratulations! Your application has been accepted. Welcome to the program!",
  },
  {
    status: ClassApplicationResponseStatus.DEFERRED,
    submittedAt: new Date("2024-03-01T09:00:00Z"),
    reviewedAt: new Date("2024-03-04T15:20:00Z"),
    feedback:
      "Your application has been deferred to the next intake. We encourage you to strengthen your profile and reapply.",
  },
];
