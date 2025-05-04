// Project collaboration test data will go here
import {
  Prisma,
  MatchQuality,
  EmploymentType,
  FeedbackType,
  SatisfactionLevel,
} from "@/generated/prisma";
export const TEST_PLACEMENTS: Omit<
  Prisma.PlacementCreateInput,
  | "createdBy"
  | "updatedBy"
  | "placementFacilitator"
  | "company"
  | "jobApplication"
  | "profile"
>[] = [
  {
    startDate: new Date(),
    endDate: new Date(),
    isCurrent: true,
    salary: 100000,
    compensationDetails: "100000",
    verified: true,
    verificationDate: new Date(),
    jobTitle: "Software Engineer",
    employmentType: EmploymentType.FULL_TIME,
    matchQuality: MatchQuality.EXCELLENT,
  },
];

export const TEST_PLACEMENTS_FEEDBACK: Omit<
  Prisma.PlacementFeedbackCreateInput,
  "createdBy" | "updatedBy" | "placement" | "respondent"
>[] = [
  {
    feedbackType: FeedbackType.EMPLOYER,
    satisfactionLevel: SatisfactionLevel.VERY_SATISFIED,
    preparednessRating: 5,
    skillsMatchRating: 5,
    cultureFitRating: 5,
    feedbackText: "This is a test feedback",
    improvementSuggestions: "This is a test improvement suggestion",
    followUpNeeded: true,
  },
];
