"use client";
import { Button } from "~/_components/final/ui/button";
import type { tableBounty, tableApplicant } from "~/app/solquest/manage/manage";
import H1 from "~/_components/final/H1";
import H3 from "~/_components/final/H3";
import P from "~/_components/final/P";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  mapBountyToTable,
  mapApplicantToTable,
} from "~/app/solquest/manage/manage";
import Table from "~/_components/final/Dashboard/Table";
import { APPLICANTS_COLUMNS } from "~/lib/utils/constants";
import { api } from "~/trpc/react";

export default function Bounty() {
  const [pageBounty, setPageBounty] = useState<tableBounty>();
  const [applicants, setApplicants] = useState<tableApplicant[]>();
  const params = useSearchParams();
  const id = params.get("id");
  const { data, isLoading } = api.bounty.readBounty.useQuery({
    bountyId: id ?? "",
  });
  const { data: applications, isFetched } =
    api.bounty.readAllApplications.useQuery({ bountyId: id ?? "" });

  const getStatus = (status: string) => {
    if (status == "in_progress") {
      return "IN PROGRESS";
    } else {
      return status.toUpperCase();
    }
  };

  // useEffect(() => {
  //   if (data){
  //     setPageBounty(mapBountyToTable([data])[0])
  //   }
  //   setApplicants(mapApplicantToTable(applications ?? []))
  // }, [isLoading, isFetched]);

  return (
    <div className="m-auto my-4 flex w-full flex-1 flex-col px-5 sm:px-12">
      {!isLoading && isFetched ? (
        <div className="rounded-md bg-white p-2">
          <H1 className="my-3 text-center">{pageBounty?.title ?? ""}</H1>
          <pre className="text-wrap text-lg font-medium">
            {pageBounty?.details}
          </pre>
          <div className="my-4">
            <P className="font-semibold">
              Status: {getStatus(pageBounty?.status ?? "")}
            </P>
            <p className="my-3 flex items-center gap-3 font-semibold">
              Pay:
              <div className="aspect-square w-7 rounded-full bg-primary">
                <Image alt="solana" src="/solana.svg" width={30} height={30} />
              </div>
              {pageBounty?.pay} USDC
            </p>
          </div>

          {pageBounty?.status == "COMPLETED" && (
            <div className="mx-auto my-3 flex max-w-4xl items-center justify-center gap-3">
              <Button variant="secondary">Withdraw Funds</Button>
            </div>
          )}
        </div>
      ) : (
        <div className="m-5 text-center text-xl">Give me a sec! ⌛</div>
      )}

      {applicants && applicants.length > 0 && (
        <div>
          <H3 className="my-5 text-center font-bold text-primary">
            Applicants
          </H3>
          <Table
            columns={APPLICANTS_COLUMNS}
            data={applicants.filter((app) => app.status == "ACCEPTED")}
            marginTop="mt-4"
          />
        </div>
      )}
    </div>
  );
}
