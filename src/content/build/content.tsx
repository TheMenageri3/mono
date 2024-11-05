"use client";
import styles from "~/styles/table.module.css";
import { DataTable } from "~/_components/final/Table/crowdfunding";
import {
  type EntrySearchResult,
  type Entry,
} from "~/server/api/routers/entry/read";
import { type ColumnDef } from "@tanstack/react-table";
import Modal from "~/_components/soldic/Modal";
import { type Dispatch, type SetStateAction, useState, useEffect } from "react";
import { CreateEntry } from "~/_components/soldic/create-entry";
import { type Session } from "next-auth";
import { api } from "~/trpc/react";
import { cn, getContrastedHexColor } from "~/utils";
import { type ExternalLink } from "~/types";
import { useRouter } from "next/navigation";
import { type Tag } from "~/server/api/routers/tag/read";
import { Button } from "~/_components/final/ui/button";
import { Input } from "~/_components/final/ui/input";
import { Label } from "~/_components/final/ui/label";
import { Textarea } from "~/_components/final/ui/textarea";
import H1 from "~/_components/final/H1";
import { Campaign } from "~/server/api/routers/campaign/read";

const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="whitespace-normal text-pretty break-words text-sm text-zinc-600">
        {row.original.title}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="whitespace-normal text-pretty break-words text-sm text-zinc-600">
        <span className="whitespace-normal text-pretty break-words text-sm text-zinc-600">
          {row.original.description}
        </span>
      </span>
    ),
  },
  {
    accessorKey: "goal",
    header: "Goal",
    cell: ({ row }) => (
      <span key="term" className={`whitespace-nowrap`}>
        <span className="whitespace-normal text-pretty break-words text-sm text-zinc-600">
          {row.original.goal.toString()}
        </span>
      </span>
    ),
  },
  {
    accessorKey: "current",
    header: "Current",
    cell: ({ row }) => (
      <span key="term" className={`whitespace-nowrap`}>
        {row.original.current.toString()}
      </span>
    ),
  },
  {
    accessorKey: "ends",
    header: "Ends",
    cell: ({ row }) => (
      <span key="term" className={`whitespace-nowrap`}>
        {row.original.ends.toLocaleDateString()}
      </span>
    ),
  },
];

function CrownfundingContent({ session }: { session: Session | null }) {
  const { data: campaigns, isLoading } = api.campaign.getAll.useQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Campaign[]>([]);
  const router = useRouter();
  useEffect(() => {
    const results =
      searchTerm === ""
        ? campaigns
        : campaigns?.filter((campaign) =>
            campaign.title.toLowerCase().includes(searchTerm.toLowerCase()),
          );
    // setSearchResults(results ?? []);
  }, [searchTerm, campaigns]);

  if (isLoading) return <div>Loading...</div>;
  if (!campaigns) return <div>No campaigns found</div>;

  return (
    <div className={styles.content}>
      <H1 className="pt-4 text-primary">Crowdfunding</H1>
      <div className={styles.innerContent}>
        <div className="mx-auto mb-6 w-full max-w-[800px]">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2 w-full rounded-md border border-solid border-black p-4 text-black"
            />
            <div
              // onMouseEnter={() => setRequestButtonHovered(true)}
              // onMouseLeave={() => setRequestButtonHovered(false)}
              className="relative flex-shrink-0"
            >
              <Button
                onClick={() => router.push("/build/crowdfunding/new")}
                className={cn(
                  "w-fit whitespace-nowrap rounded-md border border-primary bg-primary p-2 text-white",
                )}
              >
                + New Campaign
              </Button>
            </div>
          </div>
        </div>
        {campaigns && (
          <DataTable
            columns={columns}
            data={searchResults}
            onRowClick={(entry) => {}}
          />
        )}
      </div>
    </div>
  );
}

export { CrownfundingContent };
