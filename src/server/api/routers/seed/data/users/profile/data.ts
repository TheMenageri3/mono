import { QuarterType, StatusType, Prisma } from "@/generated/prisma";
export const TEST_PROFILES: Pick<
  Prisma.ProfileCreateInput,
  "firstName" | "lastName" | "email" | "phoneNumber"
>[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phoneNumber: "+12343437890",
  },
  {
    firstName: "Jim",
    lastName: "Beam",
    email: "jim.beam@example.com",
    phoneNumber: "+12345890",
  },
];
