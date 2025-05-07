"use client";

import React, { useState } from "react";
import CreateCompany from "./components/createCompany";
import UpdateCompany from "./components/updateCompany";
import DeleteCompany from "./components/deleteCompany";
import RestoreCompany from "./components/restoreCompany";
import ListCompanies from "./components/listCompanies";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CompanyPage() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Company Management</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-7 mb-8">
          <TabsTrigger value="list">List Companies</TabsTrigger>
          <TabsTrigger value="create">Create Company</TabsTrigger>
          <TabsTrigger value="update">Update Company</TabsTrigger>
          <TabsTrigger value="delete">Delete Company</TabsTrigger>
          <TabsTrigger value="restore">Restore Company</TabsTrigger>
          <TabsTrigger value="addIndustry">Add Industry</TabsTrigger>
          <TabsTrigger value="removeIndustry">Remove Industry</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <ListCompanies />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <CreateCompany />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="update" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <UpdateCompany />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delete" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <DeleteCompany />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restore" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <RestoreCompany />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
