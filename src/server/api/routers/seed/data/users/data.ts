import { UserRole, UserStatus, Prisma } from "@/generated/prisma";

// Define the type for user data based on Prisma schema
type UserCreateInput = Prisma.UserCreateInput;

// Validate that our test data matches the Prisma schema

export const TEST_USER_EMAIL = "test@themenageri3.com";

export const TEST_USER_DATA: UserCreateInput = {
  email: TEST_USER_EMAIL,
  name: "Test User",
  role: UserRole.ADMIN,
  status: UserStatus.ACTIVE,
  hashedPassword: "", // You might want to set a default password
};

// Additional test users can be added here
export const TEST_USERS: UserCreateInput[] = [
  {
    email: "instructor@themenageri3.com",
    name: "Test Instructor",
    role: UserRole.INSTRUCTOR,
    status: UserStatus.ACTIVE,
    hashedPassword: "",
  },
  {
    email: "student@themenageri3.com",
    name: "Test Student",
    role: UserRole.STANDARD,
    status: UserStatus.ACTIVE,
    hashedPassword: "",
  },
];
