import { ApplyFrontendCourse } from "~/content/apply/frontend/content";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";
import { Navbar } from "~/_components/final/Navbar";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/apply/frontend");
  }
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-start bg-white">
      <Navbar links={[]} session={session} />
      <ApplyFrontendCourse />
    </div>
  );
}
