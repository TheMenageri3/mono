import React from "react";

import ListPlacements from "./components/ListPlacements";
import UpdatePlacement from "./components/UpdatePlacement";
import DeletePlacement from "./components/DeletePlacement";
import RestorePlacement from "./components/RestorePlacement";
import CreatePlacement from "./components/CreatePlacement";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function EventPage() {
  return (
    <div>
      {/* <CreateClassApplication />
      <UpdateClassApplication />
      <DeleteClassApplication />
      <RestoreClassApplication /> */}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Placements</TabsTrigger>
          <TabsTrigger value="create">Create Placement</TabsTrigger>
          <TabsTrigger value="update">Update Placement</TabsTrigger>
          <TabsTrigger value="delete">Delete Placement</TabsTrigger>
          <TabsTrigger value="restore">Restore Placement</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ListPlacements />
        </TabsContent>
        <TabsContent value="create">
          <CreatePlacement />
        </TabsContent>
        <TabsContent value="update">
          <UpdatePlacement />
        </TabsContent>
        <TabsContent value="delete">
          <DeletePlacement />
        </TabsContent>
        <TabsContent value="restore">
          <RestorePlacement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
