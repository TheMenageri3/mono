import {
  Category,
  CommentStatus,
  Visibility,
  Priority,
  Prisma,
  RoleLevel,
  RoleCategory,
} from "@/generated/prisma";

export const TEST_USER_ROLES: Omit<
  Prisma.RoleCreateInput,
  "createdBy" | "updatedBy" | "user" | "profile" | "company"
>[] = [
  {
    name: "Admin",
    description: "Admin role",
    category: RoleCategory.EXECUTIVE,
    department: "Admin",
    level: RoleLevel.EXECUTIVE,
    isInternal: true,
  },
];
