export const TEST_SECTIONS = [
  {
    header: "Course Overview",
    metadata: {
      type: "introduction",
      order: 1,
      description: "Introduction to the course content and objectives",
      duration: "30 minutes",
      resources: ["syllabus.pdf", "course-outline.docx"],
      prerequisites: [],
    },
  },
  {
    header: "Module 1: Fundamentals",
    metadata: {
      type: "learning",
      order: 2,
      description: "Core concepts and basic principles",
      duration: "2 hours",
      resources: ["lecture-1.pdf", "practice-exercises.zip"],
      prerequisites: ["Course Overview"],
      learningObjectives: [
        "Understand basic concepts",
        "Apply fundamental principles",
        "Complete practice exercises",
      ],
    },
  },
  {
    header: "Assignments",
    metadata: {
      type: "assessment",
      order: 3,
      description: "Weekly assignments and projects",
      dueDate: "2024-04-15",
      points: 100,
      submissionType: "file-upload",
      allowedFormats: [".pdf", ".docx", ".zip"],
      rubric: {
        criteria: ["completeness", "accuracy", "presentation"],
        weights: [40, 40, 20],
      },
    },
  },
  {
    header: "Resources",
    metadata: {
      type: "materials",
      order: 4,
      description: "Additional learning materials and references",
      categories: ["textbooks", "articles", "videos", "tools"],
      items: [
        {
          title: "Recommended Textbook",
          type: "book",
          link: "https://example.com/textbook",
        },
        {
          title: "Video Tutorials",
          type: "video",
          link: "https://example.com/tutorials",
        },
      ],
    },
  },
];
