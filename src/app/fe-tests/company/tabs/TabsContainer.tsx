"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewTab } from "./OverviewTab";
import { ProductsTab } from "./ProductsTab";
import { ContactsTab } from "./ContactsTab";
import { LocationsTab } from "./LocationsTab";

export function TabsContainer() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mb-8"
    >
      <TabsList className="mx-auto mt-12 backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-lg p-1 mb-8 max-w-6xl mx-auto w-full flex justify-center">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all mx-auto w-full"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="products"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all mx-auto w-full"
        >
          Products
        </TabsTrigger>
        <TabsTrigger
          value="contacts"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all mx-auto w-full"
        >
          Contacts
        </TabsTrigger>
        <TabsTrigger
          value="locations"
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md transition-all mx-auto w-full"
        >
          Locations
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-0">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="products" className="mt-0">
        <ProductsTab />
      </TabsContent>

      <TabsContent value="contacts" className="mt-0">
        <ContactsTab />
      </TabsContent>

      <TabsContent value="locations" className="mt-0">
        <LocationsTab />
      </TabsContent>
    </Tabs>
  );
}
