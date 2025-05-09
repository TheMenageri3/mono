import React from "react";

import ListInterviews from "./components/ListInterviews";
import DeleteInterview from "./components/DeleteInterview";
import RestoreInterview from "./components/RestoreInterview";
import UpdateInterview from "./components/UpdateInterview";
import CreateInterview from "./components/CreateInterview";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function EventPage() {
  return (
    <div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Interviews</TabsTrigger>
          <TabsTrigger value="create">Create Interview</TabsTrigger>
          <TabsTrigger value="update">Update Interview</TabsTrigger>
          <TabsTrigger value="delete">Delete Interview</TabsTrigger>
          <TabsTrigger value="restore">Restore Interview</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ListInterviews />
        </TabsContent>
        <TabsContent value="create">
          <CreateInterview />
        </TabsContent>
        <TabsContent value="update">
          <UpdateInterview />
        </TabsContent>
        <TabsContent value="delete">
          <DeleteInterview />
        </TabsContent>
        <TabsContent value="restore">
          <RestoreInterview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
