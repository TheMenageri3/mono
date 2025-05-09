"use client";

import React, { useState } from "react";
import CreateFormAdminComment from "./components/CreateFormAdminComment";
import EditFormAdminComment from "./components/EditFormAdminComment";
import { DeleteButtonAdminComment } from "./components/DeleteButtonAdminComment";
import { ListAdminComment } from "./components/ListAdminComment";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminCommentPage() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin Comment Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="create">Create Admin Comment</TabsTrigger>
          <TabsTrigger value="edit">Edit Admin Comment</TabsTrigger>
          <TabsTrigger value="delete">Delete Admin Comment</TabsTrigger>
          <TabsTrigger value="list">List Admin Comment</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <CreateFormAdminComment />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <EditFormAdminComment />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delete" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <DeleteButtonAdminComment/>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <ListAdminComment/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}