// Assignment test data will go here

import {
  AssignmentType,
  AssignmentStatus,
  SubmissionType,
} from "@/generated/prisma/client";

export const TEST_ASSIGNMENTS = [
  {
    title: "Introduction to Web Development",
    description:
      "Create a simple HTML/CSS website showcasing your personal portfolio.",
    type: AssignmentType.INDIVIDUAL,
    status: AssignmentStatus.PUBLISHED,
    submissionType: SubmissionType.LINK,
    submissionInstructions:
      "Submit a link to your GitHub repository containing the website code.",
    pointsPossible: 100,
    gradingRubric: {
      criteria: [
        { name: "HTML Structure", points: 30 },
        { name: "CSS Styling", points: 30 },
        { name: "Responsive Design", points: 20 },
        { name: "Code Quality", points: 20 },
      ],
    },
    releaseDate: new Date("2024-01-15T00:00:00Z"),
    dueDate: new Date("2024-02-01T23:59:59Z"),
    allowLateSubmissions: true,
    latePenalty: {
      deduction: 10,
      interval: "day",
    },
  },
  {
    title: "Group Project: E-commerce Platform",
    description:
      "Work in teams to create a full-stack e-commerce platform using React and Node.js.",
    type: AssignmentType.GROUP,
    status: AssignmentStatus.PUBLISHED,
    submissionType: SubmissionType.MIXED,
    submissionInstructions:
      "Submit both a GitHub repository link and a deployed URL for your application.",
    pointsPossible: 200,
    gradingRubric: {
      criteria: [
        { name: "Frontend Implementation", points: 50 },
        { name: "Backend Implementation", points: 50 },
        { name: "Database Design", points: 30 },
        { name: "User Authentication", points: 30 },
        { name: "Team Collaboration", points: 40 },
      ],
    },
    releaseDate: new Date("2024-02-15T00:00:00Z"),
    dueDate: new Date("2024-04-01T23:59:59Z"),
    allowLateSubmissions: false,
  },
  {
    title: "Midterm Exam",
    description: "Comprehensive exam covering all topics from weeks 1-6.",
    type: AssignmentType.EXAM,
    status: AssignmentStatus.PUBLISHED,
    submissionType: SubmissionType.TEXT,
    submissionInstructions:
      "Complete the exam within the 2-hour time limit. Submit your answers in the text box provided.",
    pointsPossible: 100,
    gradingRubric: {
      criteria: [
        { name: "Multiple Choice", points: 40 },
        { name: "Short Answer", points: 30 },
        { name: "Problem Solving", points: 30 },
      ],
    },
    releaseDate: new Date("2024-03-01T00:00:00Z"),
    dueDate: new Date("2024-03-01T02:00:00Z"),
    allowLateSubmissions: false,
  },
  {
    title: "Final Project Proposal",
    description: "Submit a detailed proposal for your final project.",
    type: AssignmentType.PROJECT,
    status: AssignmentStatus.DRAFT,
    submissionType: SubmissionType.FILE,
    submissionInstructions:
      "Upload a PDF document containing your project proposal.",
    pointsPossible: 50,
    gradingRubric: {
      criteria: [
        { name: "Project Scope", points: 15 },
        { name: "Technical Requirements", points: 15 },
        { name: "Timeline", points: 10 },
        { name: "Innovation", points: 10 },
      ],
    },
    releaseDate: new Date("2024-04-15T00:00:00Z"),
    dueDate: new Date("2024-04-30T23:59:59Z"),
    allowLateSubmissions: true,
    latePenalty: {
      deduction: 5,
      interval: "day",
    },
  },
];
