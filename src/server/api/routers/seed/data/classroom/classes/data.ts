import { QuarterType, StatusType } from "@/generated/prisma";

export const TEST_CLASSES = [
  {
    name: "Advanced Software Engineering",
    description:
      "A comprehensive course covering modern software engineering practices",
    shortDescription:
      "Learn advanced software engineering concepts and practices",
    startDate: new Date("2024-01-08"),
    endDate: new Date("2024-03-22"),
    quarter: QuarterType.WINTER,
    year: 2024,
    status: StatusType.ACTIVE,
    maxEnrollment: 30,
    minEnrollment: 10,
    location: "Room 101, Engineering Building",
    syllabus:
      "Course syllabus covering software architecture, testing, and deployment",
    prerequisites: "Basic programming knowledge and data structures",
    learningObjectives: [
      "Understand software architecture patterns",
      "Master testing methodologies",
      "Learn deployment strategies",
    ],
  },
  {
    name: "Web Development Fundamentals",
    description:
      "Introduction to modern web development technologies and practices",
    shortDescription: "Learn the basics of web development",
    startDate: new Date("2024-01-08"),
    endDate: new Date("2024-03-22"),
    quarter: QuarterType.WINTER,
    year: 2024,
    status: StatusType.ACTIVE,
    maxEnrollment: 40,
    minEnrollment: 15,
    location: "Room 203, Computer Science Building",
    syllabus:
      "Course syllabus covering HTML, CSS, JavaScript, and basic frameworks",
    prerequisites: "Basic computer literacy",
    learningObjectives: [
      "Master HTML and CSS",
      "Understand JavaScript fundamentals",
      "Learn responsive design principles",
    ],
  },
];
