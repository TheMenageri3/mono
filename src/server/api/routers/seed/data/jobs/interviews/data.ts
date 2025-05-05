import {
  InterviewType,
  InterviewStatus,
  Prisma,
  InterviewLocationType,
} from "@/generated/prisma";

// Interview test data will go here
export const TEST_INTERVIEWS: Omit<
  Prisma.InterviewCreateInput,
  "createdBy" | "updatedBy" | "interviewee" | "jobApplication"
>[] = [
  {
    scheduledDate: new Date("2024-02-15T10:00:00Z"),
    durationMinutes: 60,
    interviewLocationType: InterviewLocationType.VIRTUAL,
    preparationNotes: "Review candidate portfolio and resume",
    status: InterviewStatus.SCHEDULED,
    feedback: null,
    candidateFeedback: null,
    type: InterviewType.TECHNICAL,
    nextSteps: "Technical assessment to be completed",
  },
  {
    scheduledDate: new Date("2024-02-16T14:30:00Z"),
    durationMinutes: 45,
    interviewLocationType: InterviewLocationType.PHYSICAL,
    preparationNotes: "Prepare technical questions",
    status: InterviewStatus.COMPLETED,
    type: InterviewType.TECHNICAL,
    feedback: "Strong technical skills, good cultural fit",
    candidateFeedback: "Positive experience, team seemed welcoming",
    nextSteps: "Schedule follow-up with hiring manager",
  },
];
