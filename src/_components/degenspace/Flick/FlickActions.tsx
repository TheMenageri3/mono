"use client";
import { IconButton } from "../UtilComponents/IconButton";

type FlickAction = {
  name: string;
  iconPath: string;
  count: number;
};

const flickActions: FlickAction[] = [
  {
    name: "respect",
    iconPath: "/spock.svg",
    count: 10,
  },
  {
    name: "reply",
    iconPath: "/reply.svg",
    count: 12,
  },
  {
    name: "dump",
    iconPath: "/bookmark.svg",
    count: 5,
  },
  {
    name: "share",
    iconPath: "/share.svg",
    count: 20,
  },
];

export const FlickActions = () => {
  return (
    <div className="flex w-full flex-row justify-between gap-[5px]">
      {flickActions.map((act) => (
        <IconButton
          key={act.name}
          iconPath={act.iconPath}
          meta={act.count}
          hoverName={act.name}
          onClick={() => {
            return null;
          }}
        />
      ))}
    </div>
  );
};