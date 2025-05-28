import "./globals.css";
import { AppLayout } from "@/components/layout/app-layout";
import { Providers } from "@/components/providers";

export const metadata = {
  title: "The Menageri3",
  description:
    "A decentralized CRM platform for organizations to own their own data, and build for their unique needs from a menu of modules.",
};

// Navigation structure with clean organization
const navigationLinks = [
  // Standalone items
  { label: "Profile", path: "/demo/profile", type: "standalone" as const },
  { label: "Jobs", path: "/demo/jobs", type: "standalone" as const },

  // Classroom dropdown - only 4 essential items
  {
    label: "Classroom",
    type: "dropdown" as const,
    items: [
      { label: "Classes", path: "/demo/classroom" },
      { label: "Submissions", path: "/demo/classroom/assignments/submission" },
      { label: "Review", path: "/demo/classroom/assignments/review" },
      { label: "Creation", path: "/demo/classroom/assignments/creation" },
      { label: "Placements", path: "/demo/classroom/placements" },
    ],
  },

  // Company dropdown - keep as is
  {
    label: "Company",
    type: "dropdown" as const,
    items: [
      { label: "Company Dashboard", path: "/demo/dashboard" },
      { label: "Company Pages", path: "/demo/company" },
      { label: "Smart Contracts", path: "/demo/smart-contract" },
      { label: "Support Tickets", path: "/demo/support-ticket" },
    ],
  },

  // Events as standalone
  { label: "Events", path: "/demo/event", type: "standalone" as const },

  // Solana Forum as standalone
  {
    label: "Solana Forum",
    path: "/demo/solana-forum",
    type: "standalone" as const,
  },

  // Testing dropdown - all the random stuff
  {
    label: "Testing",
    type: "dropdown" as const,
    items: [
      { label: "Components", path: "/testing/components" },
      { label: "Enrollments", path: "/testing/enrollment" },
      { label: "Assignment Questions", path: "/testing/assignmentQuestion" },
      {
        label: "Submission Answers",
        path: "/testing/assignmentSubmissionAnswer",
      },
      { label: "Class Applications", path: "/testing/classApplication" },
      {
        label: "Application Questions",
        path: "/testing/classApplicationQuestion",
      },
      {
        label: "Application Responses",
        path: "/testing/classApplicationResponse",
      },
      { label: "Application Answers", path: "/testing/classApplicationAnswer" },
      { label: "Event Companies", path: "/testing/eventCompany" },
      { label: "Event Attendees", path: "/testing/eventAttendee" },
      { label: "Tags", path: "/testing/tags" },
      { label: "Media", path: "/testing/media" },
      { label: "Sections", path: "/testing/section" },
      { label: "Locations", path: "/testing/location" },
      { label: "Questions", path: "/testing/question" },
      { label: "Answers", path: "/testing/answer" },
      { label: "Comments", path: "/testing/comment" },
      { label: "Admin Comments", path: "/testing/adminComment" },
      { label: "Projects", path: "/testing/projects" },
      { label: "Project Collaborators", path: "/testing/projectCollaborator" },
    ],
  },
];

// Legacy testing links for backward compatibility
const testingLinks: { label: string; path: string }[] = [
  { label: "Components", path: "/testing/components" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {" "}
        <Providers>
          {" "}
          <AppLayout
            navigationLinks={navigationLinks}
            testingLinks={testingLinks}
          >
            {children}
          </AppLayout>
        </Providers>
      </body>
    </html>
  );
}
