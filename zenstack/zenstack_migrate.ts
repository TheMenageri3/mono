import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting migration to polymorphic structure...");

  // 1. Create document types
  console.log("Creating document types...");
  const assignmentType = await prisma.documentType.create({
    data: {
      name: "assignment",
      displayName: "Assignment",
      description: "Academic assignment that students can submit responses to",
      icon: "assignment",
      config: {
        requiredMetadata: ["points", "passingThreshold"],
        sectionTypes: ["question", "resource", "instruction"],
      },
    },
  });

  const jobPostingType = await prisma.documentType.create({
    data: {
      name: "jobPosting",
      displayName: "Job Posting",
      description: "Job posting that candidates can apply to",
      icon: "work",
      config: {
        requiredMetadata: ["salary", "company", "location"],
        sectionTypes: ["requirements", "responsibilities", "benefits"],
      },
    },
  });

  // 2. Migrate existing assignments to documents
  console.log("Migrating assignments to documents...");
  const assignments = await prisma.assignment.findMany({
    include: {
      creator: true,
      submissions: {
        include: {
          student: true,
        },
      },
    },
  });

  for (const assignment of assignments) {
    // Create the document
    const document = await prisma.document.create({
      data: {
        title: assignment.title,
        description: assignment.description || "",
        deadline: assignment.dueDate,
        status: mapAssignmentStatusToDocumentStatus(assignment.status),
        typeId: assignmentType.id,
        creatorId: assignment.creatorId,
        metadata: {
          points: assignment.points,
          passingThreshold: assignment.passingGrade,
          courseId: assignment.courseId,
        },
      },
    });

    // Create sections for the assignment
    if (assignment.questions) {
      // Parse questions if stored as JSON or from separate table
      let questions = [];
      try {
        questions = typeof assignment.questions === "string"
          ? JSON.parse(assignment.questions)
          : assignment.questions;
      } catch (e) {
        questions = [{
          content: assignment.questions || "No content available",
        }];
      }

      // Create a section for each question
      for (let i = 0; i < questions.length; i++) {
        await prisma.section.create({
          data: {
            title: `Question ${i + 1}`,
            content: questions[i].content || "",
            order: i,
            documentId: document.id,
            metadata: {
              type: "question",
              points: questions[i].points || 0,
            },
          },
        });
      }
    } else {
      // Create a default section if no questions available
      await prisma.section.create({
        data: {
          title: "Assignment Details",
          content: assignment.description || "No details available",
          order: 0,
          documentId: document.id,
        },
      });
    }

    // Migrate submissions to responses
    for (const submission of assignment.submissions) {
      const response = await prisma.response.create({
        data: {
          documentId: document.id,
          creatorId: submission.studentId,
          status: mapSubmissionStatusToResponseStatus(submission.status),
          metadata: {
            grade: submission.grade,
            feedback: submission.feedback,
          },
        },
      });

      // Create response sections
      if (submission.answers) {
        // Parse answers if stored as JSON
        let answers = [];
        try {
          answers = typeof submission.answers === "string"
            ? JSON.parse(submission.answers)
            : submission.answers;
        } catch (e) {
          answers = [{ content: submission.answers || "No content available" }];
        }

        // Create a section for each answer
        for (let i = 0; i < answers.length; i++) {
          await prisma.responseSection.create({
            data: {
              title: `Answer ${i + 1}`,
              content: answers[i].content || "",
              order: i,
              responseId: response.id,
            },
          });
        }
      } else {
        // Create a default section if no answers available
        await prisma.responseSection.create({
          data: {
            title: "Submission",
            content: "No content available",
            order: 0,
            responseId: response.id,
          },
        });
      }
    }
  }

  // 3. Migrate job postings similarly
  // (Similar code structure to assignments)

  console.log("Migration completed successfully!");
}

function mapAssignmentStatusToDocumentStatus(
  status: string,
): "DRAFT" | "ACTIVE" | "CLOSED" | "ARCHIVED" {
  const statusMap: Record<string, "DRAFT" | "ACTIVE" | "CLOSED" | "ARCHIVED"> =
    {
      "draft": "DRAFT",
      "published": "ACTIVE",
      "closed": "CLOSED",
      "archived": "ARCHIVED",
    };
  return statusMap[status.toLowerCase()] || "ACTIVE";
}

function mapSubmissionStatusToResponseStatus(status: string): ResponseStatus {
  const statusMap: Record<string, ResponseStatus> = {
    "draft": "DRAFT",
    "submitted": "PENDING",
    "graded": "GRADED",
    "returned": "GRADED",
    "approved": "APPROVED",
    "rejected": "REJECTED",
  };
  return statusMap[status.toLowerCase()] || "PENDING";
}

main()
  .catch((e) => {
    console.error("Error during migration:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
