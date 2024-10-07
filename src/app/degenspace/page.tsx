import { getServerSession } from "next-auth";
import React from "react";
import { FlickComponent } from "~/_components/degenspace/Flick/Flick";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const flicks = await api.flick.read();
  const session = await getServerAuthSession();

  return (
    <div className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-col">
            {session &&
              flicks?.map((flick) => (
                <FlickComponent
                  key={flick.id}
                  flick={flick}
                  session={session}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
