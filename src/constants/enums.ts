// This is needed for Zod because it needs the actual values at runtime
export const EVENT_TYPE_VALUES = [
  "CONFERENCE",
  "WORKSHOP",
  "NETWORKING",
  "HACKATHON",
  "CAREER_FAIR",
  "INFO_SESSION",
] as const;
// Event Type  for TypeScript type checking
export type EventTypeClient = (typeof EVENT_TYPE_VALUES)[number];

export const EVENT_STATUS_VALUES = [
  "DRAFT",
  "PUBLISHED",
  "CANCELLED",
  "COMPLETED",
] as const;

export type EventStatusClient = (typeof EVENT_STATUS_VALUES)[number];
