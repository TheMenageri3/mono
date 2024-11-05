import { CreateProfile } from "~/content/signup/content";
import Image from "next/image";

export default function CreatePaperPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAC569]">
      <div className="hidden lg:block">
        <Image src={"/backdrop.svg"} layout="fill" alt="logo" />
      </div>
      <CreateProfile />
    </div>
  );
}
