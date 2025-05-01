import {
  Category,
  CommentStatus,
  Visibility,
  Priority,
  Prisma,
} from "@/generated/prisma";

export const TEST_TAGS: Omit<
  Prisma.TagCreateInput,
  "createdBy" | "updatedBy"
>[] = [
  {
    tagName: "Tag 1",
    color: "#000000",
  },
];
