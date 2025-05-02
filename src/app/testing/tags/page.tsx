"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateTag } from "./components/CreateTag";
import { ListTags } from "./components/ListTag";

export default function TagsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tag Management</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Add New Tag
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <CreateTag />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tag List */}
      <ListTags />
    </div>
  );
}
