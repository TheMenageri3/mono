"use client";
import Image from "next/image";
import P from "./P";
import { usePathname, useRouter } from "next/navigation";

export default function DegenSpaceLogo() {
  const router = useRouter();
  const path = usePathname();

  const handleClick = () => {
    if (path !== "/") router.push("/");
  };
  return (
    <div
      className="cursor-pointerrounded flex flex-row items-center px-[10px]"
      onClick={handleClick}
    >
      <Image src={"/logo_red.svg"} width={80} height={80} alt="logo" />
      <P className="text-connect ml-[-8px] text-[20px] font-bold">Connect</P>
    </div>
  );
}
