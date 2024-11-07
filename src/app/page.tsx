"use client";
import Image from "next/image";
import { Button } from "~/_components/final/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-row items-center justify-center lg:justify-between">
      <div className="relative flex h-16 w-[300px] items-center gap-2 lg:h-[30px] lg:w-[140px] xl:h-[40px] xl:w-[240px]">
        <Image
          src={"/logo-header.svg"}
          layout="fill"
          objectFit="contain"
          alt="logo"
        />
      </div>
      <div className="hidden flex-row gap-4 lg:flex">
        <Button className="translate-y-2 font-onest text-xl text-white xl:text-2xl">
          Home
        </Button>
        <Button className="translate-y-2 font-onest text-xl text-white xl:text-2xl">
          About Us
        </Button>
        <Button className="translate-y-2 font-onest text-xl text-white xl:text-2xl">
          Our Work
        </Button>
        <Button className="translate-y-2 font-onest text-xl text-white xl:text-2xl">
          Contact Us
        </Button>
      </div>
      <Button
        type="submit"
        className="box-content hidden w-40 bg-gold-600 px-16 py-1 text-lg font-bold text-darkness-500 hover:bg-gold-500 lg:block xl:w-48 xl:px-20 xl:text-xl"
        variant="default"
        onClick={() => {
          router.push("/signup");
        }}
      >
        Join the community
      </Button>
    </div>
  );
};

const HomeContent = () => {
  const router = useRouter();

  return (
    <div className="mt-32 flex flex-col items-center justify-center xl:mt-48">
      <div className="max-w-[300px] text-wrap text-center font-dragonfire text-5xl text-white lg:max-w-[1800px] lg:text-[90px]/[1] xl:text-[140px]/[1]">
        UNITE, LEARN, AND BUILD
      </div>
      <div className="max-w-[300px] text-wrap text-center font-dragonfire text-5xl text-gold-600 lg:max-w-[1800px] lg:text-[90px]/[1] xl:text-[140px]/[1]">
        THE FUTURE OF SOLANA
      </div>
      <div className="mt-10 max-w-[300px] text-wrap text-center font-onest text-2xl text-white lg:max-w-[1800px] lg:text-2xl xl:max-w-[1800px] xl:text-[54px]/[74px]">
        The Menagerie is a vibrant community of developers, dreamers, and doers
        on a mission to shape the future of Web3 together
      </div>
      <div className="mt-10 flex flex-row gap-4">
        <Button
          onClick={() => {
            router.push("/signup");
          }}
          className="box-content w-40 bg-gold-600 px-16 py-1 text-lg font-bold text-darkness-500 hover:bg-gold-500 xl:w-48 xl:px-20 xl:text-xl"
        >
          Join the community
        </Button>
        <Button
          variant="outline"
          className="box-content hidden w-40 border-gold-600 bg-transparent px-16 py-1 text-lg font-bold text-gold-600 hover:bg-darkness-500 hover:text-gold-600 lg:block xl:w-48 xl:px-20 xl:text-xl"
        >
          See Our Work -&gt;
        </Button>
      </div>
    </div>
  );
};

const WhoWeAre = () => {
  return (
    <>
      <div className="font-dragonfire text-6xl text-gold-600 lg:mt-60">
        WHO WE ARE
      </div>
      <div className="mt-4 max-w-[300px] text-wrap text-center font-onest text-lg text-white lg:mt-10 lg:max-w-[1200px] lg:text-2xl xl:max-w-[1200px] xl:text-[34px]/[74px]">
        The Menagerie is a development house dedicated to fostering
        collaboration and growth among Solana builders. Here, developers from
        all backgrounds come together to connect, share knowledge, and push the
        boundaries of Web3 innovation. With a strong focus on inclusivity,
        Menagerie supports creators at every stage, providing a vibrant space to
        learn, build, and bring ideas to life. Driven by a commitment to
        progress and community, Menagerie empowers developers to shape the
        future of Solana together.
      </div>
    </>
  );
};

const Connect = () => {
  return (
    <>
      <div className="mt-20 flex flex-row items-center gap-4 lg:mt-60">
        <div className="relative hidden h-[3rem] w-[100px] lg:flex lg:w-[300px]">
          <Image src={"/bar-red.svg"} layout="fill" alt="logo" />
        </div>
        <div className="relative flex h-[3rem] w-[100px] lg:hidden lg:w-[300px]">
          <Image src={"/bar-red-sm.svg"} layout="fill" alt="logo" />
        </div>
        <div className="translate-y-1 align-middle font-dragonfire text-4xl text-ruby-500 lg:h-[3rem] xl:text-6xl">
          CONNECT
        </div>
        <div className="relative hidden h-[3rem] w-[100px] lg:flex lg:w-[300px]">
          <Image src={"/bar-red.svg"} layout="fill" alt="logo" />
        </div>
        <div className="relative flex h-[3rem] w-[100px] lg:hidden lg:w-[300px]">
          <Image src={"/bar-red-sm.svg"} layout="fill" alt="logo" />
        </div>
      </div>
      <div className="relative mt-10 h-[200px] w-[200px] lg:h-[300px] lg:w-[300px]">
        <Image src={"/placeholder-red.svg"} layout="fill" alt="logo" />
      </div>
      <div className="mt-10 max-w-[300px] text-wrap text-center font-onest text-lg text-white lg:max-w-[1200px] lg:text-2xl xl:max-w-[1200px] xl:text-[34px]/[74px]">
        Alice and Bob take time to learn more ZK by reading cutting edge
        research on the platform. They are able to apply a theory they read
        about
      </div>
      {/* <Button
        variant="outline"
        className="mt-10 box-content w-40 border-ruby-500 bg-transparent px-16 py-4 text-lg font-bold text-ruby-500 hover:bg-darkness-500 hover:text-ruby-500 xl:w-48 xl:px-20 xl:text-xl"
      >
        Learn More -&gt;
      </Button> */}
    </>
  );
};

const Learn = () => {
  return (
    <>
      <div className="mt-20 flex flex-row items-center gap-4 lg:mt-60">
        <div className="relative hidden h-[3rem] w-[100px] lg:flex lg:w-[300px]">
          <Image src={"/bar-green.svg"} layout="fill" alt="logo" />
        </div>
        <div className="relative flex h-[3rem] w-[100px] lg:hidden lg:w-[300px]">
          <Image src={"/bar-green-sm.svg"} layout="fill" alt="logo" />
        </div>

        <div className="translate-y-1 align-middle font-dragonfire text-4xl text-emerald-500 lg:h-[3rem] xl:text-6xl">
          LEARN
        </div>
        <div className="relative hidden h-[3rem] w-[100px] lg:flex lg:w-[300px]">
          <Image src={"/bar-green.svg"} layout="fill" alt="logo" />
        </div>
        <div className="relative flex h-[3rem] w-[100px] lg:hidden lg:w-[300px]">
          <Image src={"/bar-green-sm.svg"} layout="fill" alt="logo" />
        </div>
      </div>
      <div className="relative mt-10 h-[200px] w-[200px] lg:h-[300px] lg:w-[300px]">
        <Image src={"/placeholder-green.svg"} layout="fill" alt="logo" />
      </div>
      <div className="mt-10 max-w-[300px] text-wrap text-center font-onest text-lg text-white lg:max-w-[1200px] lg:text-2xl xl:max-w-[1200px] xl:text-[34px]/[74px]">
        Alice and Bob take time to learn more ZK by reading cutting edge
        research on the platform. They are able to apply a theory they read
        about
      </div>
      {/* <Button
        variant="outline"
        className="mt-10 box-content w-40 border-emerald-500 bg-transparent px-16 py-4 text-lg font-bold text-emerald-500 hover:bg-darkness-500 hover:text-emerald-500 xl:w-48 xl:px-20 xl:text-xl"
      >
        Learn More -&gt;
      </Button> */}
    </>
  );
};

const Build = () => {
  return (
    <>
      <div className="mt-20 flex flex-row items-center gap-4 lg:mt-60">
        <div className="relative hidden h-[3rem] w-[100px] lg:flex lg:w-[300px]">
          <Image src={"/bar-blue.svg"} layout="fill" alt="logo" />
        </div>
        <div className="relative flex h-[3rem] w-[100px] lg:hidden lg:w-[300px]">
          <Image src={"/bar-blue-sm.svg"} layout="fill" alt="logo" />
        </div>
        <div className="translate-y-1 align-middle font-dragonfire text-4xl text-sapphire-500 lg:h-[3rem] xl:text-6xl">
          BUILD
        </div>
        <div className="relative hidden h-[3rem] w-[100px] lg:flex lg:w-[300px]">
          <Image src={"/bar-blue.svg"} layout="fill" alt="logo" />
        </div>
        <div className="relative flex h-[3rem] w-[100px] lg:hidden lg:w-[300px]">
          <Image src={"/bar-blue-sm.svg"} layout="fill" alt="logo" />
        </div>
      </div>
      <div className="relative mt-10 h-[200px] w-[200px] lg:h-[300px] lg:w-[300px]">
        <Image src={"/placeholder-blue.svg"} layout="fill" alt="logo" />
      </div>
      <div className="mt-10 max-w-[300px] text-wrap text-center font-onest text-lg text-white lg:max-w-[1200px] lg:text-2xl xl:max-w-[1200px] xl:text-[34px]/[74px]">
        As Alice crowdfunds money to continue her the research, and Bob gets
        placed at Spaceman Gaming.
      </div>
      {/* <Button
        variant="outline"
        className="mt-10 box-content w-40 border-sapphire-500 bg-transparent px-16 py-4 text-lg font-bold text-sapphire-500 hover:bg-darkness-500 hover:text-sapphire-500 xl:w-48 xl:px-20 xl:text-xl"
      >
        Learn More -&gt;
      </Button> */}
    </>
  );
};

const OurWork = () => {
  return (
    <div className="mt-40 flex flex-row gap-4 lg:mt-80">
      <div className="relative flex flex-col items-center pb-20 xl:w-[1800px]">
        <div className="absolute inset-0 min-h-screen bg-darkness-100 opacity-10" />
        <WhoWeAre />
        <Connect />
        <Learn />
        <Build />
      </div>
    </div>
  );
};

const CallToAction = () => {
  const router = useRouter();
  return (
    <div className="mb-20 mt-20 flex flex-col items-center gap-4 lg:mb-80 lg:mt-80">
      <div className="font-dragonfire text-4xl text-white lg:text-[120px]/[1] xl:text-[140px]/[1]">
        READY TO BUILD WITH US?
      </div>
      <Button
        onClick={() => {
          router.push("/signup");
        }}
        className="box-content w-40 bg-gold-600 px-16 py-1 text-lg font-bold text-darkness-500 hover:bg-gold-500 xl:w-48 xl:px-20 xl:text-xl"
      >
        Join the community
      </Button>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="mb-20 flex w-full flex-col items-center justify-between lg:flex-row xl:max-w-[1800px]">
      <div className="relative flex h-[140px] w-[140px] translate-x-2 items-center gap-2 lg:translate-x-0 xl:h-[240px] xl:w-[240px]">
        <Image
          src={"/logo-gold.svg"}
          layout="fill"
          objectFit="contain"
          alt="logo"
        />
      </div>
      <div className="flex flex-col items-center gap-2 lg:items-start">
        <div className="font-onest text-2xl text-gold-600">Find Us</div>
        <Link
          href={"https://discord.gg/PQDPfcTU95"}
          target="_blank"
          className="flex flex-row items-center gap-2 font-onest text-xl text-white"
        >
          <div className="relative flex h-[30px] w-[30px]">
            <Image src={"/discord.svg"} layout="fill" alt="logo" />
          </div>
          Discord
        </Link>
        <Link
          href={"https://github.com/TheMenageri3"}
          target="_blank"
          className="flex flex-row items-center gap-2 font-onest text-xl text-white"
        >
          <div className="relative flex h-[30px] w-[30px]">
            <Image src={"/github.svg"} layout="fill" alt="logo" />
          </div>
          Github
        </Link>
        <Link
          href={"https://x.com/themenageri3"}
          target="_blank"
          className="flex flex-row items-center gap-2 font-onest text-xl text-white"
        >
          <div className="relative flex h-[30px] w-[30px]">
            <Image src={"/x.svg"} layout="fill" alt="logo" />
          </div>
          X
        </Link>
      </div>
    </div>
  );
};

export default function HomePage() {
  const router = useRouter();
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
