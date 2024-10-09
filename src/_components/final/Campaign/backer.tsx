import React from "react";
import H4 from "../H4";
import P from "../P";
import { AvatarWithName } from "../Avatar";
import { getScoreColorClass } from "~/lib/utils/helpers";
import { Review } from "~/lib/validation";
import { Backer } from "~/server/api/routers/campaign/read";

interface BackerProps {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  backer: Backer & { time: string };
}

export default function BackerComponent({ backer }: BackerProps) {
  const scoreColorClass = getScoreColorClass(6);

  return (
    <div className="border-b border-zinc-200 py-4">
      <div className="cursor-pointer">
        <div className="mb-2 grid grid-cols-[auto,1fr,auto] items-center gap-2">
          <AvatarWithName name={backer.user.name ?? ""} />
          <div className="flex items-center gap-2">
            <P className="text-xs font-medium">{backer.user.name}</P>
            <P className="text-xs text-zinc-500">{backer.time}</P>
          </div>
          <div
            className={`flex items-center justify-center ${scoreColorClass} h-10 rounded-md px-2 font-arbutus text-xs font-medium text-white`}
          >
            {backer.amount.toString()} SOL
          </div>
        </div>
      </div>
      <div className="mt-4">
        <P className="text-pretty text-sm text-zinc-600">{backer.message}</P>
      </div>
    </div>
  );
}
