import Image from "next/image";
import P from "./P";

export const DesearcherLogo = () => {
  return (
    <div className="flex flex-row items-center gap-[3px]">
      <Image src={"/logo_green.svg"} width={50} height={50} alt="logo" />
      <P className="hidden font-bold md:block">Learn</P>
    </div>
  );
};
