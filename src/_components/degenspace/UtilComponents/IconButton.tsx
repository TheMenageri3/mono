import Image from "next/image";
import P from "../P";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/_components/ui/tooltip";
import clsx from "clsx";

export const IconButton = ({
  iconPath,
  meta,
  onClick,
  hoverName,
  active,
}: {
  iconPath: string;
  onClick?: () => void;
  meta: number;
  hoverName: string;
  active?: boolean;
}) => {
  return (
    <React.Fragment>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={clsx(
              "hover:bg-primary-20 relative flex cursor-pointer flex-row items-center gap-[4px] rounded-full p-[10px]",
              active && "bg-primary-50",
            )}
          >
            <Image
              src={iconPath}
              alt="img"
              height={20}
              width={20}
              onClick={onClick}
            />
            <P className="text-[12px] font-semibold">{meta}</P>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          {hoverName}
        </TooltipContent>
      </Tooltip>
    </React.Fragment>
  );
};
