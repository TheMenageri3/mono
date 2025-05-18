"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./OverviewTab";
import { AssignmentsTab } from "./AssignmentsTab";
import { DiscussionsTab } from "./DiscussionsTab";
import { ResourcesTab } from "./ResourcesTab";

export function TabsContainer() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mb-8"
    >
      <TabsList className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-1 mb-8">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="assignments"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
        >
          Assignments
        </TabsTrigger>
        <TabsTrigger
          value="discussions"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
        >
          Discussions
        </TabsTrigger>
        <TabsTrigger
          value="resources"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all"
        >
          Resources
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-0">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="assignments" className="mt-0">
        <AssignmentsTab />
      </TabsContent>

      <TabsContent value="discussions" className="mt-0">
        <div className="container max-w-3xl mx-auto">
          <DiscussionsTab />
        </div>
      </TabsContent>

      <TabsContent value="resources" className="mt-0">
        <ResourcesTab />
      </TabsContent>
    </Tabs>
  );
}
