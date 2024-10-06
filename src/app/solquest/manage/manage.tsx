"use client";
import H4 from "~/_components/final/H4";
import Table from "~/_components/final/Dashboard/Table";
import { Button } from "~/_components/final/ui/button";
import { BOUNTIES_COLUMNS } from "~/lib/utils/constants";
import type { Item } from "~/_components/final/Dashboard/Table";
import type { Bounties, BountyApplications } from "~/server/api/routers/bounty/read";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { api } from "~/trpc/react";

export type tableBounty = {
  id: string,
  title: string,
  pay: number,
  details: string,
  publisher: string,
  track: string,
  status: string,
  createdDate: string,
}

export type tableApplicant = {
  id: string,
  name: string,
  createdAt: string, 
  status: string
}

export const mapBountyToTable = (bounties: Bounties[]):tableBounty[] => {
  return bounties.map(bounty => ({
    id: bounty.id,
    title: bounty.name,
    pay: bounty.compensation.amount,
    details: bounty.description,
    publisher: bounty.company? bounty.company.name : bounty.pointOfContact.name ?? "User",
    track: bounty.track,
    status: bounty.status,
    createdDate: new Date(bounty.createdAt).toLocaleDateString(),
  }))
}

export const mapApplicantToTable = (applicants: BountyApplications[]):tableApplicant[] => {
  return applicants.map(applicant => ({
    id: applicant.id,
    name: applicant.user.name ?? "User",
    createdAt: new Date(applicant.createdAt).toLocaleDateString(),
    status: applicant.status,
  }))
}

export default function Manage({session}:{session: null | Session}) {
  const router = useRouter();
  const {data: readWorkingBounties, isFetched } = api.bounty.readWorkingBounties.useQuery()
  const {data: readOwnedBounties, isLoading } = api.bounty.readOwnedBounties.useQuery()
  const [bountyType, setBountyType] = useState<"owned" | "working">("owned");

  const onRowClickOwned = (item: Item) => {
    router.push(`/solquest/manage/owned?id=${item.id}`);
  };

  const onRowClickWorking = (item: Item) => {
    router.push(`/solquest/manage/working?id=${item.id}`);
  };


  const memoizedWorkingBounty = useMemo(() => {
    if (readWorkingBounties){
      return mapBountyToTable(readWorkingBounties)
    }
    return []
  }, [readWorkingBounties]) 

  const memoizedOwnedBounty = useMemo(() => {
    if (readOwnedBounties){
      return mapBountyToTable(readOwnedBounties)
    }
    return []
  }, [readOwnedBounties]) 

  return (
    <main className="sm:px-12 m-auto my-4 flex w-full flex-1 flex-col px-5">
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="link"
          onClick={() => {setBountyType("owned")}}
          className={`${bountyType == "owned" && "underline"} text-base font-semibold`}
        >
          Owned
        </Button>

        |

        <Button
          variant="link"
          onClick={() => {setBountyType("working")}}
          className={`${bountyType == "working" && "underline"} text-base font-semibold`}
        >
          Working
        </Button>
      </div>

      <div className="flex flex-col">
        {memoizedOwnedBounty.length === 0 && bountyType=="owned" && (
          <H4 className="pt-10 text-center text-zinc-600">
            {!isLoading ? <span>
            No bounties found. <Button 
            className="text-xl p-0" 
            onClick={() => router.push("/solquest/bounties/create")} 
            variant="link">Create a new one ⚡</Button>
            </span> : <span>Loading your bounties ⌛</span>}
          </H4>
        )}
        {memoizedWorkingBounty.length === 0 && bountyType=="working" && (
          <H4 className="pt-10 text-center text-zinc-600">
            {isFetched ? <span>
            No bounties found. <Button 
            className="text-xl p-0" 
            onClick={() => router.push("/solquest/bounties")} 
            variant="link">Apply to one ⚡</Button>
            </span> : <span>Loading your work 😉 </span>}
          </H4>
        )}

        {bountyType == "owned" && memoizedOwnedBounty.length > 0 && (
          <Table
            columns={BOUNTIES_COLUMNS}
            data={memoizedOwnedBounty}
            marginTop="mt-4"
            whenRowClick={bountyType == "owned" ? onRowClickOwned : onRowClickWorking}
          />
        )}
        {bountyType == "working" && memoizedWorkingBounty.length > 0 && (
          <Table
            columns={BOUNTIES_COLUMNS}
            data={memoizedWorkingBounty}
            marginTop="mt-4"
            whenRowClick={bountyType != "working" ? onRowClickOwned : onRowClickWorking}
          />
        )}
      </div>
    </main>
  );
}
