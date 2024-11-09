import { CreateProfile } from "~/content/signup/content";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "~/server/auth";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-darkness-300">
      <Image
        src={"/backdrop.svg"}
        layout="fill"
        className="top-0 hidden object-cover lg:sticky"
        alt="logo"
      />
      <div className="bg-darkness-200 absolute inset-0 h-screen opacity-90"></div>

      <CreateProfile />
    </div>
  );
}
