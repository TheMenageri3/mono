import { CreateProfile } from "~/content/signup/content";
import Image from "next/image";

export default async function SignupPage() {
  return (
    <div className="bg-darkness-300 flex min-h-screen flex-col items-center justify-center">
      <div className="hidden lg:block">
        <Image
          src={"/backdrop.svg"}
          layout="fill"
          objectFit="cover"
          alt="logo"
        />
        <div className="bg-darkness-200 absolute inset-0 opacity-90"></div>
      </div>
      <CreateProfile />
    </div>
  );
}
