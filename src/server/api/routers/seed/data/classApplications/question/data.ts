import { QuestionType } from "@/generated/prisma/client";

export const TEST_QUESTIONS = [
  {
    text: "What is your current level of education?",
    description: "Please select your highest completed level of education",
    type: QuestionType.SELECT,
    required: true,
    order: 1,
    metadata: {
      options: ["High School", "Bachelor's Degree", "Master's Degree", "PhD"],
    },
  },
  {
    text: "How many years of experience do you have in this field?",
    description: "Enter the number of years as a whole number",
    type: QuestionType.NUMBER,
    required: true,
    order: 2,
    metadata: {
      min: 0,
      max: 50,
    },
  },
  {
    text: "What programming languages are you proficient in?",
    description: "Select all that apply",
    type: QuestionType.MULTISELECT,
    required: false,
    order: 3,
    metadata: {
      options: ["JavaScript", "Python", "Java", "C++", "Ruby", "Go"],
    },
  },
  {
    text: "How would you rate your communication skills?",
    description: "On a scale of 1 to 5",
    type: QuestionType.SCALE,
    required: true,
    order: 4,
    metadata: {
      min: 1,
      max: 5,
      labels: {
        1: "Poor",
        3: "Average",
        5: "Excellent",
      },
    },
  },
  {
    text: "When can you start?",
    description: "Select your preferred start date",
    type: QuestionType.DATE,
    required: true,
    order: 5,
    metadata: {
      minDate: "2024-04-01",
      maxDate: "2024-12-31",
    },
  },
];
