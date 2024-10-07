"use client";
import type { GetStaticPaths } from "next";
import { Button } from "~/_components/final/ui/button";

import bounties from "~/constants/bounty.json";
import applicants from "~/constants/dummyApplicants.json";
import H1 from "~/_components/final/H1";
import H3 from "~/_components/final/H3";
import P from "~/_components/final/P";
import type { Item } from "~/_components/final/Dashboard/Table";
import Image from "next/image";
import { useEffect, useState } from "react";
import Table from "~/_components/final/Dashboard/Table";
import { APPLICANTS_COLUMNS } from "~/lib/utils/constants";
import { DAO, Proposal } from "~/server/api/routers/dao/read";
import { Decimal } from "@prisma/client/runtime/library";
import { DAOType, ProposalStatus } from "@prisma/client";
import { DataTable } from "~/_components/final/Table/crowdfunding";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "~/utils";
import { useRouter } from "next/navigation";

const columns: ColumnDef<Proposal>[] = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span key="term" className={`whitespace-nowrap`}>
        <span className="whitespace-normal text-pretty break-words text-sm text-zinc-600">
          {row.original.status}
        </span>
      </span>
    ),
  },
  {
    accessorKey: "quorum",
    header: "Quorum",
    cell: ({ row }) => (
      <span key="term" className={`whitespace-nowrap`}>
        {row.original.quorum.toString()}
      </span>
    ),
  },
  {
    accessorKey: "forVotes",
    header: "For Votes",
    cell: ({ row }) => (
      <span key="term" className={`whitespace-nowrap`}>
        {row.original.forVotes.toString()}
      </span>
    ),
  },
  {
    accessorKey: "ends",
    header: "Ends",
    cell: ({ row }) => (
      <span key="term" className={`whitespace-nowrap`}>
        {/* {row.original.endDate.toLocaleDateString()} */}
      </span>
    ),
  },
];

interface ManageProps {
  item: Item | undefined;
  name: string;
  handleClick: () => void;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = bounties.map((bounty) => ({
    params: { id: bounty.id },
  }));

  return { paths, fallback: false };
};

export default function ManageDAO({ dao }: { dao: DAO }) {
  const getStatus = (status: string) => {
    if (status == "in_progress") {
      return "IN PROGRESS";
    } else {
      return status.toUpperCase();
    }
  };

  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <H1 className="mb-8 text-center text-primary">{dao?.name ?? ""}</H1>
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-zinc-50 p-6 shadow-md">
            <div className="flex flex-col gap-1">
              <P className="font-base text-lg">{dao?.description}</P>
              <P className="font-atkinson pt-6 text-secondary">
                Type: {getStatus(dao?.type ?? "")}
              </P>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <P className="text-center text-base font-semibold">
                    Treasury Size:
                  </P>
                  <div className="aspect-square w-7 rounded-full bg-primary">
                    <Image
                      alt="solana"
                      src="/solana-w.svg"
                      width={30}
                      height={30}
                    />
                  </div>
                  <span className="font-semibold">
                    {dao?.circulatingSupply.toString()} SOL
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button
              onClick={() => router.push("/build/governance/dao/proposal/new")}
              className={cn(
                "w-full max-w-md whitespace-nowrap rounded-md border border-primary bg-primary p-4 text-lg font-semibold text-white hover:bg-primary/90",
              )}
            >
              + New Campaign
            </Button>
          </div>
        </div>
      </div>

      <H3 className="mb-8 mt-12 text-center font-bold text-zinc-800">
        Proposals
      </H3>
      <div>
        <DataTable columns={columns} data={dao?.proposals ?? []} />
      </div>
    </div>
  );
}
