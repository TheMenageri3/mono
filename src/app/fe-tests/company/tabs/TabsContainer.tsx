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
      className="w-full mb-16"
    >
      <TabsList className="mt-8 backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-lg p-1 mb-8 max-w-6xl mx-auto w-full flex justify-center">
        <TabsTrigger
          value="overview"
          className="rounded-md border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-white/5 data-[state=active]:text-white py-3 px-4 text-white/70"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="products"
          className="rounded-md border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-white/5 data-[state=active]:text-white py-3 px-4 text-white/70"
        >
          Products
        </TabsTrigger>
        <TabsTrigger
          value="contacts"
          className="rounded-md border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-white/5 data-[state=active]:text-white py-3 px-4 text-white/70"
        >
          Contacts
        </TabsTrigger>
        <TabsTrigger
          value="locations"
          className="rounded-md border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:bg-white/5 data-[state=active]:text-white py-3 px-4 text-white/70"
        >
          Locations
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="overview"
        className="mt-0 animate-in fade-in-50 duration-300"
      >
        <OverviewTab />
      </TabsContent>

      <TabsContent
        value="products"
        className="mt-0 animate-in fade-in-50 duration-300"
      >
        <ProductsTab />
      </TabsContent>

      <TabsContent
        value="contacts"
        className="mt-0 animate-in fade-in-50 duration-300"
      >
        <ContactsTab />
      </TabsContent>

      <TabsContent
        value="locations"
        className="mt-0 animate-in fade-in-50 duration-300"
      >
        <LocationsTab />
      </TabsContent>
    </Tabs>
  );
}
