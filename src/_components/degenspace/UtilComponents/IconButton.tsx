import Image from "next/image";
import P from "../P";
import React from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const IconButton = ({
  iconPath,
  onClick,
  hoverName,
  meta,
}: {
  iconPath: string;
  onClick: () => void;
  hoverName: string;
  meta?: any;
}) => {
  return (
    <React.Fragment>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={
              meta
                ? "flex hover:bg-backgroundHover rounded-full cursor-pointer p-[10px] flex-row gap-[3px] items-center"
                : "flex hover:bg-backgroundHover rounded-full cursor-pointer p-[3px] flex-row gap-[3px] items-center"
            }
          >
            <Image
              src={iconPath}
              alt="img"
              height={20}
              width={20}
              onClick={onClick}
            />
            {meta && <P className="text-[13px] font-bold">{meta}</P>}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          {hoverName}
        </TooltipContent>
      </Tooltip>
    </React.Fragment>
  );
};
