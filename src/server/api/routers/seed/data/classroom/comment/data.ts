import {
  Category,
  CommentStatus,
  Visibility,
  Priority,
  Prisma,
} from "@/generated/prisma";

export const TEST_COMMENTS = [
  {
    text: "Great work on the assignment! Your analysis was very thorough and well-structured.",
    status: CommentStatus.ACTIVE,
  },

  {
    text: "This comment has been edited for clarity.",
    status: CommentStatus.EDITED,
  },

  {
    text: "This comment has been deleted by the user.",
    status: CommentStatus.DELETED,
  },
  {
    text: "The feedback on my last assignment was very constructive. I've implemented all the suggested improvements in this submission.",
    status: CommentStatus.ACTIVE,
  },

  {
    text: "I've noticed a typo in the grading rubric. The total points don't add up to 100.",
    status: CommentStatus.ACTIVE,
  },
];

export const TEST_ADMIN_COMMENTS: Omit<
  Prisma.AdminCommentCreateInput,
  "createdBy" | "updatedBy" | "comment"
>[] = [
  {
    visibility: Visibility.PUBLIC,
    category: Category.FEEDBACK,
    priority: Priority.HIGH,
    resolved: false,
  },
];
