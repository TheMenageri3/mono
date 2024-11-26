import Image from "next/image";
import { type Metadata } from "next";
import {
  Header,
  HomeContent,
  OurWork,
  CallToAction,
  Footer,
} from "~/content/home";

export const metadata: Metadata = {
  title: "The Menagerie",
  description: "The Menagerie",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-darkness-600">
      <div className="">
        <Image
          src={"/backdrop.svg"}
          layout="fill"
          objectFit="cover"
          alt="logo"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(9,7,8,0.9)] via-[rgb(9,7,8,0.9)] to-darkness-600"></div>
      </div>
      <div className="relative mt-10 flex w-full flex-col items-center justify-center lg:mt-[70px] lg:px-[112px]">
        <Header />
        <HomeContent />
        <OurWork />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}
