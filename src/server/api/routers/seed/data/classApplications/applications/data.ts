// Class application test data will go here

import { ApplicationStatus } from "@/generated/prisma";

export const TEST_CLASS_APPLICATIONS = [
  {
    title: "Web Development Bootcamp - Spring 2024",
    description:
      "A comprehensive 12-week bootcamp covering full-stack web development with React, Node.js, and PostgreSQL.",
    status: ApplicationStatus.ACTIVE,
    startDate: new Date("2024-03-01T00:00:00Z"),
    endDate: new Date("2024-05-24T23:59:59Z"),
  },
  {
    title: "Data Science Fundamentals - Summer 2024",
    description:
      "Introduction to data science concepts, Python programming, and machine learning basics.",
    status: ApplicationStatus.DRAFT,
    startDate: new Date("2024-06-15T00:00:00Z"),
    endDate: new Date("2024-08-31T23:59:59Z"),
  },
  {
    title: "Cybersecurity Certification Program - Fall 2024",
    description:
      "Advanced cybersecurity training covering network security, ethical hacking, and security protocols.",
    status: ApplicationStatus.ARCHIVED,
    startDate: new Date("2023-09-01T00:00:00Z"),
    endDate: new Date("2023-12-15T23:59:59Z"),
  },
  {
    title: "UX/UI Design Workshop - Winter 2024",
    description:
      "Hands-on workshop focusing on user experience and interface design principles.",
    status: ApplicationStatus.ACTIVE,
    startDate: new Date("2024-01-10T00:00:00Z"),
    endDate: new Date("2024-02-28T23:59:59Z"),
  },
];
