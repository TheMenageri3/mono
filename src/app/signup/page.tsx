import { CreateProfile } from "~/content/signup/content";
import Image from "next/image";

export default async function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-darkness-300">
      <Image
        src={"/backdrop.svg"}
        layout="fill"
        className="sticky top-0 object-cover"
        alt="logo"
      />
      <div className="bg-darkness-200 absolute inset-0 h-screen opacity-90"></div>

      <CreateProfile />
    </div>
  );
}
