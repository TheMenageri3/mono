"use client";

import { Button } from "~/_components/final/ui/button";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { clearReturnUrl, getReturnUrl } from "~/lib/utils/auth";
import Image from "next/image";

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
      <div className="hidden flex-row gap-8 lg:flex">
        <Link
          href={"#home-content"}
          className="translate-y-2 font-onest text-xl text-white xl:text-2xl"
        >
          Home
        </Link>
        <Link
          href={"#about-us"}
          className="translate-y-2 font-onest text-xl text-white xl:text-2xl"
        >
          About Us
        </Link>
        <Link
          href={"#what-we-do"}
          className="translate-y-2 font-onest text-xl text-white xl:text-2xl"
        >
          What We Do
        </Link>
        <Link
          href={"#contact-us"}
          className="translate-y-2 font-onest text-xl text-white xl:text-2xl"
        >
          Contact Us
        </Link>
      </div>
      <Button
        type="submit"
        className="box-content hidden w-40 bg-gold-600 px-16 py-1 text-lg font-bold text-darkness-500 hover:bg-gold-500 lg:block xl:w-48 xl:px-20 xl:text-xl"
        variant="default"
        onClick={() => {
          router.push("/signup");
        }}
      >
        Join the waitlist
      </Button>
    </div>
  );
};

const HomeContent = () => {
  const router = useRouter();

  return (
    <div
      id="home-content"
      className="mt-32 flex flex-col items-center justify-center xl:mt-48"
    >
      <div className="max-w-[300px] text-wrap text-center font-dragonfire text-5xl text-white lg:max-w-[1800px] lg:text-[80px]/[1] xl:text-[122px]/[1]">
        CONNECT, LEARN, AND BUILD
      </div>
      <div className="max-w-[300px] text-wrap text-center font-dragonfire text-5xl text-gold-600 lg:max-w-[1800px] lg:text-[80px]/[1] xl:text-[140px]/[1]">
        THE FUTURE OF SOLANA
      </div>
      <div className="mt-10 hidden max-w-[300px] text-wrap text-center font-onest text-2xl text-white lg:max-w-[1800px] lg:text-2xl xl:max-w-[1800px] xl:text-[54px]/[74px]">
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
          Join the waitlist
        </Button>
        {/* <Button
            variant="outline"
            className="box-content hidden w-40 border-gold-600 bg-transparent px-16 py-1 text-lg font-bold text-gold-600 hover:bg-darkness-500 hover:text-gold-600 lg:block xl:w-48 xl:px-20 xl:text-xl"
          >
            See Our Work -&gt;
          </Button> */}
      </div>
    </div>
  );
};

const WhoWeAre = () => {
  return (
    <>
      <div id="about-us" className="font-dragonfire text-6xl text-gold-600">
        WHO WE ARE
      </div>
      <div className="mt-4 max-w-[300px] text-wrap text-center font-onest text-lg text-white lg:mt-10 lg:max-w-[1200px] lg:text-2xl xl:max-w-[1200px] xl:text-[34px]/[74px]">
        The Menagerie is the all-in-one launchpad for connecting, learning, and
        building on Solana. Our goal is to be the starting point for
        developers&apos; journeys into Solana and to enable the growth of
        research and nascent projects.
      </div>
    </>
  );
};

const Connect = () => {
  return (
    <>
      <div
        id="what-we-do"
        className="mt-20 flex flex-row items-center gap-4 lg:mt-60"
      >
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
        A web3 social network for developers to connect with each other, share
        knowledge, and build together.
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
        Educational resources for developers and a publishing platform for
        researchers.
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
        Tools to crowdfund, manage, and launch projects on Solana.
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
      <div className="relative flex flex-col items-center xl:w-[1600px]">
        <div className="relative h-16 w-full lg:h-[160px]">
          <div className="absolute inset-0 left-[-53px] h-16 w-[160px] lg:left-[-10px] lg:h-[160px]">
            <Image
              src={"/emblem-top-left.svg"}
              layout="fill"
              alt="logo"
              className="absolute left-0 top-0"
            />
          </div>
          <div className="absolute inset-0 left-[314px] h-16 w-16 lg:left-[1450px] lg:h-[160px] lg:w-[160px]">
            <Image
              src={"/emblem-top-right.svg"}
              layout="fill"
              alt="logo"
              className="absolute left-0 top-0"
            />
          </div>
        </div>

        <div className="absolute inset-0 min-h-screen bg-chest-500 opacity-20" />
        <WhoWeAre />
        <Connect />
        <Learn />
        <Build />
        <div className="relative h-16 w-full lg:h-[160px]">
          <div className="absolute inset-0 left-[-53px] h-16 w-[160px] lg:left-[-10px] lg:h-[160px]">
            <Image
              src={"/emblem-bottom-left.svg"}
              layout="fill"
              alt="logo"
              className="absolute left-0 top-0"
            />
          </div>
          <div className="absolute inset-0 left-[314px] h-16 w-16 lg:left-[1450px] lg:h-[160px] lg:w-[160px]">
            <Image
              src={"/emblem-bottom-right.svg"}
              layout="fill"
              alt="logo"
              className="absolute left-0 top-0"
            />
          </div>
        </div>
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
        Join the waitlist
      </Button>
    </div>
  );
};

const Footer = () => {
  return (
    <div
      id="contact-us"
      className="mb-20 flex w-full flex-col items-center justify-between lg:flex-row xl:max-w-[1800px]"
    >
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

export {
  Header,
  HomeContent,
  WhoWeAre,
  Connect,
  Learn,
  Build,
  OurWork,
  CallToAction,
  Footer,
};
