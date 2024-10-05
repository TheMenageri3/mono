"use client";
import { Logo } from "../Logo";
import { JobBoard } from "./JobBoard";
import { Search } from "./Search";
import { ProfileInfo } from "./ProfileInfo";
import { Wallet } from "./Wallet";

export const LeftSideBar = () => {
  return (
    <div className="w-1/3 h-full p-2 flex flex-col items-center">
      <div className="mt-[20px] flex flex-col gap-[10px] w-full h-full items-start">
        <Logo />
        <Wallet />
        <ProfileInfo />
        <Search />
        <JobBoard />
      </div>
    </div>
  );
};
