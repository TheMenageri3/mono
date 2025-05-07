"use client";

import React from "react";
import { useJobApplicatioQueries } from "../hooks/useJobApplicationQueries";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BriefcaseIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import JobPostingCard from "./JobPostingCard";
import JobApplicationCard from "./JobApplicationCard";

export function Applications() {
  const { useAllJobApplications, useAllJobPostings } = useJobApplicatioQueries();
  const { data: jobApplications } = useAllJobApplications();
  const { data: jobPostings, isLoading, error } = useAllJobPostings();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // if (!events?.length) return <div>No events found</div>;

  return (
    <div className="container mx-auto px-4 max-w-5xl">
  <h1 className="text-3xl font-bold py-5">Job application</h1>

    <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Postings</TabsTrigger>
              <TabsTrigger value="application">Applications</TabsTrigger>
            </TabsList>
    
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BriefcaseIcon className="h-5 w-5" />
                    <span>Job Listings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : jobPostings && jobPostings.length > 0 ? (
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="grid grid-cols-1 gap-3">
                        {jobPostings?.map((job) => (
                          <JobPostingCard
                            key={job.id}
                            job={job}
                          />
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
            </TabsContent>
            <TabsContent value="application">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BriefcaseIcon className="h-5 w-5" />
                    <span>Job Applications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : jobApplications && jobApplications.length > 0 ? (
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="grid grid-cols-1 gap-3">
                        {jobApplications?.map((job) => (
                          <JobApplicationCard key={job.id} job={job} />
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="py-12 text-center border border-dashed rounded-lg">
                      <BriefcaseIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">No application yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          </div>
  );
}
