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
  { label: "AssignmentQuestion", path: "/testing/assignmentQuestion" },
  { label: "Components", path: "/testing/components" },
  { label: "Class Applications", path: "/testing/classApplication" },
  { label: "Class Application Responses", path: "/testing/classApplicationResponse" },
  { label: "Tags", path: "/testing/tags" },
  { label: "Assignment Submission Answers", path: "/testing/assignmentSubmissionAnswer" },
  { label: "Assignment Submissions", path: "/testing/assignmentSubmission" },
  { label: "Enrollment", path: "/testing/enrollment " },
  { label: "Users", path: "/testing/assignment" },
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
