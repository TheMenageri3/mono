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
  {
    header: "Discussion Forum",
    metadata: {
      type: "interaction",
      order: 5,
      description: "Class discussions and Q&A",
      rules: ["Be respectful", "Stay on topic", "Cite sources"],
      categories: ["general", "assignments", "resources"],
      moderation: {
        enabled: true,
        autoModeration: true,
        reportThreshold: 3,
      },
    },
  },
  {
    header: "Announcements",
    metadata: {
      type: "communication",
      order: 6,
      description: "Important course updates and news",
      priorityLevels: ["urgent", "important", "regular"],
      notificationSettings: {
        email: true,
        push: true,
        inApp: true,
      },
      archiveAfter: "30 days",
    },
  },
  {
    header: "Grades",
    metadata: {
      type: "assessment",
      order: 7,
      description: "Student performance and grading",
      components: [
        {
          name: "Assignments",
          weight: 40,
        },
        {
          name: "Quizzes",
          weight: 20,
        },
        {
          name: "Final Exam",
          weight: 40,
        },
      ],
      gradingScale: {
        A: [90, 100],
        B: [80, 89],
        C: [70, 79],
        D: [60, 69],
        F: [0, 59],
      },
    },
  },
  {
    header: "Calendar",
    metadata: {
      type: "scheduling",
      order: 8,
      description: "Course schedule and important dates",
      viewOptions: ["month", "week", "day"],
      syncOptions: ["google", "ical", "outlook"],
      reminders: {
        enabled: true,
        defaultTime: "24 hours",
        customTimes: ["1 week", "1 day", "1 hour"],
      },
    },
  },
];
