export const TEST_ANSWERS = [
  {
    value: {
      type: "text",
      content:
        "I have 5 years of experience in software development, specializing in full-stack web applications.",
    },
  },
  {
    value: {
      type: "multiple_choice",
      selected: ["A", "C"],
      options: ["A", "B", "C", "D"],
    },
  },
  {
    value: {
      type: "file_upload",
      fileUrl: "https://example.com/uploads/resume.pdf",
      fileName: "resume.pdf",
      fileSize: 1024576,
    },
  },
  {
    value: {
      type: "rating",
      score: 4,
      scale: 5,
      comment: "Very satisfied with the course content and delivery.",
    },
  },
  {
    value: {
      type: "matrix",
      responses: [
        { question: "Q1", answer: "Strongly Agree" },
        { question: "Q2", answer: "Agree" },
        { question: "Q3", answer: "Neutral" },
      ],
    },
  },
];
