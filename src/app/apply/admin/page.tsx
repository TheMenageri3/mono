import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";
import { ApplicationAdminPanel } from "~/content/apply/admin";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  if (
    !(
      session.user.email === "jack@web3builders.dev" ||
      session.user.email === "jack@sturt.io" ||
      session.user.email === "jeff@turbin3.com"
    )
  ) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-white">
      <ApplicationAdminPanel />
    </div>
  );
}
