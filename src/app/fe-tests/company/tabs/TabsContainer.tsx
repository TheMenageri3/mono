"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./OverviewTab";

export function TabsContainer() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mb-8"
    >
      <TabsList className="mx-auto mt-12 backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-lg p-1 mb-8 max-w-4xl mx-auto w-full flex justify-center">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all mx-auto w-full"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="assignments"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all mx-auto w-full"
        >
          Products
        </TabsTrigger>
        <TabsTrigger
          value="discussions"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all mx-auto w-full"
        >
          Contacts
        </TabsTrigger>
        <TabsTrigger
          value="resources"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all mx-auto w-full"
        >
          Locations
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-0">
        <OverviewTab />
      </TabsContent>
    </Tabs>
  );
}
