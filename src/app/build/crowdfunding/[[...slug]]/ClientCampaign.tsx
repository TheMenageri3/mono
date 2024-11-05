"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "~/trpc/react";
import CampaignContentComponent from "~/_components/final/Campaign/content";

const ClientCampaign = ({ id }: { id: string }) => {
  const { data: campaign, isLoading } = api.campaign.getOne.useQuery({ id });

  if (isLoading) return <div>Loading...</div>;
  if (!campaign) return <div>No campaign found</div>;

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      {/* <CampaignContentComponent campaign={campaign} /> */}
    </div>
  );
};

export default ClientCampaign;
