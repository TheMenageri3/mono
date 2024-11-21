import { ApplyBuildersCourse } from "~/content/apply/builders/content";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white">
      <ApplyBuildersCourse />
    </div>
  );
}
