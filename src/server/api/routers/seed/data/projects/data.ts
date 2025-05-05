import { ProjectStatus } from "@/generated/prisma/client";

export const TEST_PROJECTS = [
  {
    title: "E-commerce Platform Redesign",
    description:
      "Modernize and improve the user experience of our existing e-commerce platform.",
    status: ProjectStatus.IN_PROGRESS,
    startDatetime: new Date("2024-03-01T00:00:00Z"),
    endDatetime: new Date("2024-06-30T23:59:59Z"),
    budget: 50000,
    teamSize: 5,
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    deliverables: [
      "New responsive UI design",
      "Improved checkout flow",
      "Mobile app integration",
      "Analytics dashboard",
    ],
    milestones: [
      {
        title: "Design Phase",
        dueDate: new Date("2024-03-31T23:59:59Z"),
        completed: false,
      },
      {
        title: "Development Phase",
        dueDate: new Date("2024-05-15T23:59:59Z"),
        completed: false,
      },
      {
        title: "Testing Phase",
        dueDate: new Date("2024-06-15T23:59:59Z"),
        completed: false,
      },
    ],
  },
  {
    title: "Data Analytics Dashboard",
    description:
      "Create a comprehensive dashboard for business analytics and reporting.",
    status: ProjectStatus.IN_PROGRESS,
    startDatetime: new Date("2024-04-01T00:00:00Z"),
    endDatetime: new Date("2024-07-31T23:59:59Z"),
    budget: 35000,
    teamSize: 3,
    technologies: ["Python", "React", "PostgreSQL", "D3.js"],
    deliverables: [
      "Interactive data visualizations",
      "Custom reporting tools",
      "Data export functionality",
      "User access management",
    ],
    milestones: [
      {
        title: "Requirements Gathering",
        dueDate: new Date("2024-04-15T23:59:59Z"),
        completed: false,
      },
      {
        title: "Prototype Development",
        dueDate: new Date("2024-05-30T23:59:59Z"),
        completed: false,
      },
      {
        title: "Final Implementation",
        dueDate: new Date("2024-07-15T23:59:59Z"),
        completed: false,
      },
    ],
  },
  {
    title: "Mobile App Development",
    description: "Build a cross-platform mobile application for our service.",
    status: ProjectStatus.COMPLETED,
    startDatetime: new Date("2023-09-01T00:00:00Z"),
    endDatetime: new Date("2023-12-31T23:59:59Z"),
    budget: 75000,
    teamSize: 4,
    technologies: ["React Native", "Firebase", "Redux", "Jest"],
    deliverables: [
      "iOS and Android apps",
      "Backend API integration",
      "Push notification system",
      "App store deployment",
    ],
    milestones: [
      {
        title: "Design and Planning",
        dueDate: new Date("2023-09-30T23:59:59Z"),
        completed: true,
      },
      {
        title: "Development",
        dueDate: new Date("2023-11-15T23:59:59Z"),
        completed: true,
      },
      {
        title: "Testing and Launch",
        dueDate: new Date("2023-12-15T23:59:59Z"),
        completed: true,
      },
    ],
  },
  {
    title: "API Gateway Implementation",
    description:
      "Implement a secure and scalable API gateway for our microservices.",
    status: ProjectStatus.ARCHIVED,
    startDatetime: new Date("2024-01-15T00:00:00Z"),
    endDatetime: new Date("2024-04-15T23:59:59Z"),
    budget: 45000,
    teamSize: 3,
    technologies: ["Kong", "Docker", "Kubernetes", "OAuth2"],
    deliverables: [
      "API gateway setup",
      "Authentication system",
      "Rate limiting",
      "Monitoring and logging",
    ],
    milestones: [
      {
        title: "Infrastructure Setup",
        dueDate: new Date("2024-02-15T23:59:59Z"),
        completed: true,
      },
      {
        title: "Security Implementation",
        dueDate: new Date("2024-03-15T23:59:59Z"),
        completed: false,
      },
      {
        title: "Testing and Deployment",
        dueDate: new Date("2024-04-01T23:59:59Z"),
        completed: false,
      },
    ],
  },
];
