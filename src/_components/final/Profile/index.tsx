"use client";

import React, { useState, useRef, useEffect } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileTabs } from "./ProfileTabs";
import Table from "~/_components/final/Dashboard/Table";

import { minimizePubkey } from "~/lib/utils/helpers";
import { PROFILE_COLUMNS } from "~/lib/utils/constants";
import { useBackgroundImage } from "~/hooks/useBackgroundImage";
import dummyUser from "~/constants/dummyUser.json";

export default function ProfileComponent() {
  const minimizedWalletAddress = minimizePubkey("0x12345678901678901234567890");
  const [activeTab, setActiveTab] = useState("contributions");
  const {
    backgroundImage,
    isNewBackgroundImage,
    handleEditClick,
    handleSaveClick,
  } = useBackgroundImage();

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const prevActiveTabRef = useRef(activeTab);

  useEffect(() => {
    if (prevActiveTabRef.current !== activeTab && tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
    prevActiveTabRef.current = activeTab;
  }, [activeTab]);

  return (
    <div className="mx-auto mb-20 w-full max-w-7xl px-6 lg:px-8">
      <ProfileBanner
        avatarSrc="/avatar.png"
        onEditClick={handleEditClick}
        onSaveClick={handleSaveClick}
        isVerified={true}
        backgroundImage={backgroundImage}
        isNewBackgroundImage={isNewBackgroundImage}
      />

      <ProfileInfo
        name={dummyUser[0]?.name ?? ""}
        organization={dummyUser[0]?.companies?.[0] ?? ""}
        walletAddress={minimizedWalletAddress}
        fullWalletAddress={dummyUser[0]?.wallets?.[0] ?? ""}
        // socialLink={dummyUser[0]?.socialLinks?.[0] ?? ""}
        bio={dummyUser[0]?.bio ?? ""}
        stats={{
          papers: 12,
          reviewedPapers: 30,
          reputation: 70,
        }}
      />

      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div
        ref={tableContainerRef}
        className="h-[calc(100vh-400px)] overflow-y-auto"
      >
        <Table columns={PROFILE_COLUMNS} data={[]} />
      </div>
    </div>
  );
}
