"use client";

import React, { useState } from "react";
import { CreateAssignmentQuestion } from "./components/CreateAssignmentQuestion";
import { UpdateAssignmentQuestion } from "./components/UpdateAssignmentQuestion";
import { DeleteAssignmentQuestion } from "./components/DeleteAssignmentQuestion";
import { RestoreAssignmentQuestion } from "./components/RestoreAssignmentQuestion";
import { ListAssignmentQuestions } from "./components/ListAssignmentQuestion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AssignmentQuestionPage() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Assignment Questions Management</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="list">List Questions</TabsTrigger>
          <TabsTrigger value="create">Create Question</TabsTrigger>
          <TabsTrigger value="update">Update Question</TabsTrigger>
          <TabsTrigger value="delete">Delete Question</TabsTrigger>
          <TabsTrigger value="restore">Restore Question</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <ListAssignmentQuestions />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <CreateAssignmentQuestion />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="update" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <UpdateAssignmentQuestion />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="delete" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <DeleteAssignmentQuestion />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="restore" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <RestoreAssignmentQuestion />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}