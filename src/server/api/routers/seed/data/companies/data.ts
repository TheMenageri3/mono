import { CompanySize, EngagementLevel, Prisma } from "@/generated/prisma";

export const TEST_COMPANIES = [
  {
    name: "TechCorp Inc.",
    description:
      "A leading technology company specializing in software solutions",
    size: CompanySize.LARGE,
    foundedYear: 2010,
    headquarters: "San Francisco, CA",
    locations: ["San Francisco", "New York", "London"],
    missionStatement: "To revolutionize the tech industry through innovation",
    benefits:
      "Comprehensive health coverage, 401k matching, flexible work arrangements",
    culture: "Fast-paced, innovative, and collaborative environment",
    active: true,
  },
  {
    name: "StartUp Labs",
    description: "An innovative startup incubator and accelerator",
    size: CompanySize.STARTUP,
    foundedYear: 2020,
    headquarters: "Austin, TX",
    locations: ["Austin"],
    missionStatement: "To nurture the next generation of tech entrepreneurs",
    benefits: "Equity options, unlimited PTO, learning stipend",
    culture: "Entrepreneurial spirit with a focus on growth and learning",
    active: true,
  },
];

export const TEST_COMPANY_CONTACTS: Omit<
  Prisma.CompanyContactCreateInput,
  "createdBy" | "updatedBy" | "company" | "contact" | "user"
>[] = [
  {
    title: "CEO",
    department: "Executive",
    isPrimary: true,
    engagementLevel: EngagementLevel.ACTIVE,
    lastContactDate: new Date("2024-01-01"),
    notes: "John Doe is the CEO of TechCorp Inc.",
  },
];
