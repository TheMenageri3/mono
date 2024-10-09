import Image from "next/image";
import P from "./P";

export const DesearcherLogo = () => {
  return (
    <div className="flex flex-row items-center gap-[3px]">
      <Image src={"/logo_green.svg"} width={100} height={100} alt="logo" />
      <P className="-ml-2 hidden text-2xl font-bold text-[#05EAA1] md:block">
        Learn
      </P>
    </div>
  );
};
