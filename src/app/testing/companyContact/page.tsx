"use client";

import React, { useState } from "react";
import CreateCompanyContact from "./components/createCompanyContact";
import UpdateCompanyContact from "./components/updateCompanyContact";
import DeleteCompanyContact from "./components/deleteCompanyContact";
import RestoreCompanyContact from "./components/restoreCompanyContact";
import ListCompanyContacts from "./components/listCompanyContacts";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CompanyContactPage() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Company Contact Management</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="list">List Contacts</TabsTrigger>
          <TabsTrigger value="create">Create Contact</TabsTrigger>
          <TabsTrigger value="update">Update Contact</TabsTrigger>
          <TabsTrigger value="delete">Delete Contact</TabsTrigger>
          <TabsTrigger value="restore">Restore Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <ListCompanyContacts />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <CreateCompanyContact />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="update" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <UpdateCompanyContact />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delete" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <DeleteCompanyContact />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restore" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <RestoreCompanyContact />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
