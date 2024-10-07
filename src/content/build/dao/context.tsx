"use client";
import styles from "~/styles/table.module.css";
import { DataTable } from "~/_components/final/Table/crowdfunding";
import { type ColumnDef } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { type Session } from "next-auth";
import { cn } from "~/utils";
import { useRouter } from "next/navigation";
import { Button } from "~/_components/final/ui/button";
import { Input } from "~/_components/final/ui/input";
import H1 from "~/_components/final/H1";
import { Campaign } from "~/server/api/routers/campaign/read";
import { DAO } from "~/server/api/routers/dao/read";

const columns: ColumnDef<DAO>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="whitespace-normal text-pretty break-words text-sm text-zinc-600">
        {row.original.name}
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
    accessorKey: "creator",
    header: "Creator",
    cell: ({ row }) => (
      <span key="term" className={`whitespace-nowrap`}>
        {row.original.creator.name}
      </span>
    ),
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => (
      <span key="term" className={`whitespace-nowrap`}>
        <span className="whitespace-normal text-pretty break-words text-sm text-zinc-600">
          {/* {row.original.treasury.balance.toString()} */}
        </span>
      </span>
    ),
  },
  {
    accessorKey: "proposals",
    header: "Proposals",
    cell: ({ row }) => (
      <span key="term" className={`whitespace-nowrap`}>
        {row.original.proposals.length}
      </span>
    ),
  },
];

function DaoContent({
  daos,
}: {
  daos: DAO[] | undefined;
  session: Session | null;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DAO[]>([]);
  const router = useRouter();
  useEffect(() => {
    const results =
      searchTerm === ""
        ? daos
        : daos?.filter((dao) =>
            dao.name.toLowerCase().includes(searchTerm.toLowerCase()),
          );
    setSearchResults(results ?? []);
  }, [searchTerm, daos]);

  return (
    <div className={styles.content}>
      <H1 className="pt-4 text-primary">DAOs</H1>
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

            <div className="relative flex-shrink-0">
              <Button
                onClick={() => router.push("/build/governance/dao/new")}
                className={cn(
                  "w-fit whitespace-nowrap rounded-md border border-primary bg-primary p-2 text-white",
                )}
              >
                + New DAO
              </Button>
            </div>
          </div>
        </div>

        {daos && (
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

export { DaoContent };
