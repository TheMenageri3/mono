import { Prisma } from "@/generated/prisma";
export const TEST_VENUE_CONTACT_INFO: Omit<
  Prisma.VenueContactInfoCreateInput,
  "createdBy" | "updatedBy" | "venue" | "location"
>[] = [
  {
    email: "john.doe@example.com",
    phone: "+1234567890",
    website: "https://www.example.com",
    contactName: "John Doe",
    department: "Sales",
  },
];
