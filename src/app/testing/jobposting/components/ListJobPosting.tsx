"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useJobPostingQueries } from "../hooks/useJobPostingQueries";
import { BriefcaseIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function ListJobPosting() {
  const { useAllJobPosting } = useJobPostingQueries();
  const { data: jobPostings, isLoading, error } = useAllJobPosting();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // if (!jobPostings?.length) return <div>No job posting found</div>;

  return (
    <Card>
      <CardHeader>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : jobPostings && jobPostings.length > 0 ? (
          <ScrollArea className="h-[600px] pr-4">
            <div className="grid grid-cols-1 gap-3">
              {jobPostings.map((job) => (
               <Card key={job.id}>
               <CardContent className="p-4">
                 <div className="flex justify-between items-start">
                   <div>
                     <h3 className="font-semibold text-lg">{job.title}</h3>
                     <p className="text-sm text-muted-foreground">
                       {job.shortDescription}
                     </p>
                     <div className="flex gap-2 mt-2">
                       <Badge variant="secondary">{job.remoteOption}</Badge>
                       <Badge variant="secondary">{job.employmentType}</Badge>
                       <Badge variant="secondary">{job.location}</Badge>
                     </div>
                   </div>
                   <div className="flex gap-1">
                     <Button size="icon" variant="ghost" className="h-8 w-8">
                       <PencilIcon className="h-4 w-4" />
                     </Button>
                     <Button
                       size="icon"
                       variant="ghost"
                       className="h-8 w-8 text-destructive"
                     >
                       <Trash2Icon className="h-4 w-4" />
                     </Button>
                   </div>
                 </div>
               </CardContent>
             </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="py-12 text-center border border-dashed rounded-lg">
            <BriefcaseIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No job postings yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
