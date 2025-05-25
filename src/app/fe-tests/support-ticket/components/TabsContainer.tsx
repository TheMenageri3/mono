"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsContainer() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="w-full bg-transparent rounded-lg p-1 justify-start">
        <TabsTrigger
          value="all"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="open"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
        >
          Open
        </TabsTrigger>
        <TabsTrigger
          value="in-progress"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
        >
          In Progress
        </TabsTrigger>{" "}
        <TabsTrigger
          value="pending"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
        >
          Pending
        </TabsTrigger>
        <TabsTrigger
          value="resolved"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
        >
          Resolved
        </TabsTrigger>
        <TabsTrigger
          value="closed"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
        >
          Closed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
