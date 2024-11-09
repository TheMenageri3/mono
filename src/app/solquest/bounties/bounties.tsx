"use client";
import H3 from "~/_components/final/H3";
import H4 from "~/_components/final/H4";
import Sidebar from "~/_components/solquest/sidebar/Sidebar";
import Search from "./search";
import { Button } from "~/_components/final/ui/button";
import { Listing } from "~/_components/solquest/general/Listing";
import { useState } from "react";
import type { Bounties } from "~/server/api/routers/bounty/read";
import Link from "next/link";
import { api } from "~/trpc/react";
import type { Session } from "next-auth";

export type bountyFilter = {
  track: string;
  status: string;
};

export default function Bounties({ session }: { session: Session | null }) {
  const { data: retrievedBounties, isLoading } =
    api.bounty.readAllBounties.useQuery();
  const [filter, setFilter] = useState<bountyFilter>({
    track: "ALL",
    status: "ALL",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const search = (text: string) => {
    setSearchTerm(text);
  };

  const setStatusFilter = (e: string) => {
    setFilter((prev) => ({ ...prev, status: e }));
    console.log("Clicked filter button");
    console.log(filter);
  };

  const setTrackFilter = (e: string) => {
    setFilter((prev) => ({ ...prev, track: e }));
    console.log("Clicked filter button");
    console.log(filter);
  };

  return (
    <main className="m-auto flex w-full flex-1 flex-col px-5 sm:px-12">
      <div className="my-4 flex items-center justify-between">
        <H3>Bounties</H3>
        <Link href="/solquest/bounties/create" className="m-5">
          <Button className="text-sm text-white">Create new bounty</Button>
        </Link>
      </div>

      <section className="my-5 flex h-max flex-1 flex-col gap-3 md:flex-row">
        <Sidebar
          filter={filter}
          setStatusFilter={setStatusFilter}
          setTrackFilter={setTrackFilter}
        />

        <div className="flex-1">
          <Search search={search} />
          {!isLoading && !retrievedBounties && (
            <H4 className="pt-10 text-center text-zinc-600">
              No bounties found. Create a new one ⚡
            </H4>
          )}
          {isLoading && (
            <H4 className="pt-10 text-center text-zinc-600">
              Loading universal bounties{" "}
              <span className="animate-spin">⌛</span>
            </H4>
          )}
          {!isLoading &&
            retrievedBounties
              ?.filter((bounty) => {
                const matchesSearch = bounty.name.includes(searchTerm);
                const matchesTrack =
                  filter.track == "ALL" || bounty.track == filter.track;
                const matchesStatus =
                  filter.status == "ALL" || bounty.status == filter.status;
                return matchesSearch && matchesTrack && matchesStatus;
              })
              .map((bounty) => (
                // <Listing
                //   key={bounty.id}
                //   bounty={bounty}
                //   session={session}
                // />
                <div key={bounty.id}>{bounty.name}</div>
              ))}
        </div>
      </section>
    </main>
  );
}
