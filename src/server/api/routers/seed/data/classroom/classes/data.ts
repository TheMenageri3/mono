import {
  QuarterType,
  StatusType,
  Prisma,
  EnrollmentStatus,
} from "@/generated/prisma";
export const TEST_CLASSES: Omit<
  Prisma.ClassCreateInput,
  "createdBy" | "updatedBy"
>[] = [
  {
    title: "Advanced Software Engineering",
    description:
      "A comprehensive course covering modern software engineering practices",
    shortDescription:
      "Learn advanced software engineering concepts and practices",
    startDate: new Date("2024-01-08"),
    endDate: new Date("2024-03-22"),
    quarter: QuarterType.WINTER,
    year: 2024,
    status: StatusType.ACTIVE,
    location: "Room 101, Engineering Building",
    enrollmentCapacity: 30,
    syllabusUrl: "https://example.com/syllabus",
    meetingSchedule: "MWF 10:00-11:00",
  },
  {
    title: "Web Development Fundamentals",
    description:
      "Introduction to modern web development technologies and practices",
    shortDescription: "Learn the basics of web development",
    startDate: new Date("2024-01-08"),
    endDate: new Date("2024-03-22"),
    quarter: QuarterType.WINTER,
    year: 2024,
    status: StatusType.ACTIVE,
    location: "Room 203, Computer Science Building",
    enrollmentCapacity: 40,
    syllabusUrl: "https://example.com/syllabus",
    meetingSchedule: "MWF 10:00-11:00",
  },
];

export const TEST_ENROLLMENTS: Omit<
  Prisma.EnrollmentCreateInput,
  "createdBy" | "updatedBy" | "class" | "student"
>[] = [
  {
    enrollmentDate: new Date("2024-01-08"),
    status: EnrollmentStatus.ENROLLED,
  },
];
