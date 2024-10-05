"use client";
import Image from "next/image";
import P from "../P";
import { useRouter } from "next/navigation";

export const JobBoard = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/JobBoard");
  };
  return (
    <div
      className="flex flex-row gap-[10px] items-center p-[10px]  hover:bg-backgroundHover rounded min-h-[20px] cursor-pointer"
      onClick={handleClick}
    >
      <Image src="/job.svg" alt="job" height={30} width={30} />
      <P className="font-bold">Job Board</P>
    </div>
  );
};
