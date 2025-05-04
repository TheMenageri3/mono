import {
  Category,
  CommentStatus,
  Visibility,
  Priority,
  Prisma,
} from "@/generated/prisma";

export const TEST_USER_SKILLS: Omit<
  Prisma.UserSkillCreateInput,
  "createdBy" | "updatedBy" | "profile" | "tag"
>[] = [
  {
    selfRating: 4.5,
    notes: "I have a lot of experience with this skill",
  },
];
