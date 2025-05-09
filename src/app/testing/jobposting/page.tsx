"use client";

import { useState } from "react";
import CreateJobPosting from "./components/CreateJobPosting";
import { ListJobPosting } from "./components/ListJobPosting";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function JobPostingsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Posting</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>
                Fill in the details for the new job position.
              </DialogDescription>
            </DialogHeader>
               <ScrollArea className="max-h-[60vh]">

            <CreateJobPosting />
               </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <ListJobPosting />
    </div>
  );
}
