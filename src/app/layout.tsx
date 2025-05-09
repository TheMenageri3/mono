import "./globals.css";
import { AppLayout } from "@/components/layout/app-layout";
import { Providers } from "@/components/providers";

export const metadata = {
  title: "The Menageri3",
  description: "A decentralized CRM platform for organizations to own their own data, and build for their unique needs from a menu of modules.",
};

// Main navigation links
const links: { label: string; path: string }[] = [
  { label: "Account", path: "/account" },
  { label: "Clusters", path: "/clusters" },
  { label: "Components", path: "/testing/components" },
];

// Testing dropdown items
const testingLinks: { label: string; path: string }[] = [
  { label: "Components", path: "/testing/components" },
  { label: "Tags", path: "/testing/tags" },
  { label: "Media", path: "/testing/media" },
  { label: "Section", path: "/testing/section" },
  { label: "Location", path: "/testing/location" },
  { label: "Question", path: "/testing/question" },
  { label: "Answer", path: "/testing/answer" },
  { label: "Comment", path: "/testing/comment" },
  { label: "Enrollment", path: "/testing/enrollment " },
  { label: "Users", path: "/testing/assignment" },
  { label: "Admin Comment", path: "/testing/adminComment" },
  { label: "Class Application", path: "/testing/classApplication" },
  { label: "Class Application Question", path: "/testing/classApplicationQuestion" },
  { label: "Class Application Response", path: "/testing/classApplicationResponse" },
  { label: "Class Application Answer", path: "/testing/classApplicationAnswer" },
  { label: "Assignment", path: "/testing/assignment" },
  { label: "AssignmentQuestion", path: "/testing/assignmentQuestion" },
  { label: "Assignment Submission", path: "/testing/assignmentSubmission" },
  { label: "Assignment Submission Answer", path: "/testing/assignmentSubmissionAnswer" },
  { label: "Events", path: "/testing/event" },
  { label: "Event Companies", path: "/testing/eventCompany" },
  { label: "Event Attendees", path: "/testing/eventAttendee" },
  { label: "Projects", path: "testing/projects" } // this includes both project and project collaborator

];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <AppLayout links={links} testingLinks={testingLinks}>
            {children}
          </AppLayout>
        </Providers>
      </body>
    </html>
  );
}
