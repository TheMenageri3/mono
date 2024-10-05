import Image from "next/image";
import P from "../P";
import { HorizontalLine } from "../UtilComponents/Horizontalline";
import React from "react";
import { FlickActions } from "./FlickActions";

export type FlickData = {
  displayName: string;
  username: string;
  data: string;
};

export const Flick = (flickData: FlickData) => {
  return (
    <React.Fragment>
      <div className="flex flex-col w-full p-[10px] items-start gap-[10px]">
        <div className="flex flex-row gap-[10px] w-full items-start p-[10px]">
          <Image src="/user.svg" alt="img" height={30} width={30} />
          <div className="flex flex-col gap-[5px]">
            <div className="flex flex-row gap-[5px] items-center">
              <P className="text-[15px] font-bold">{flickData.displayName}</P>
              <P className="text-[13px] font-bold text-primary/90">
                {flickData.username}
              </P>
            </div>
            <div>
              <P className="text-[16px] font-[500]">{flickData.data}</P>
            </div>
          </div>
        </div>
        <FlickActions />
      </div>
      <HorizontalLine />
    </React.Fragment>
  );
};
