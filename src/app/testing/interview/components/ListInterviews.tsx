"use client";

import React, { useState } from "react";
import { useInterviewsQueries } from "../hooks/useInterviewsQueries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InterviewType } from "@/generated/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export default function ListInterviews() {
  const [inputId, setInputId] = useState("");
  const [searchId, setSearchId] = useState("");

  const [inputTitle, setInputTitle] = useState("");
  const [searchTitle, setSearchTitle] = useState<InterviewType>("PHONE_SCREEN");

  const {
    useAllInterviews,
    useInterviewById,
    useInterviewsByFilter,
    useDeletedInterviews,
  } = useInterviewsQueries();
  const {
    data: allInterviews,
    isLoading: loadingAll,
    error: errorAll,
  } = useAllInterviews(defaultQueryParams);

  const {
    data: deletedInterviews,
    isLoading: loadingDeleted,
    error: errorDeleted,
  } = useDeletedInterviews(defaultQueryParams);

  const {
    data: singleInterview,
    isLoading: loadingSingle,
    error: errorSingle,
  } = useInterviewById({ id: searchId });

  const {
    data: interviewByType,
    isLoading: loadingFiltered,
    error: errorFiltered,
  } = useInterviewsByFilter({ type: searchTitle });

  // if (loadingAll) {
  //   return <div>Loading...</div>;
  // }

  if (errorAll) {
    return <div>Error: {errorAll.message}</div>;
  }

  if (errorDeleted) {
    return <div>Error: {errorDeleted.message}</div>;
  }

  // if (errorSingle) {
  //   return <div>Error: {errorSingle.message}</div>;
  // }

  // if (errorFiltered) {
  //   return <div>Error: {errorFiltered.message}</div>;
  // }

  // if (!allClassApplications?.length)
  //   return <div>No placement found</div>;

  return (
    <div className="space-y-6">
      {/* All Interviews */}
      <Card>
        <CardHeader>
          <CardTitle>All Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          {allInterviews && allInterviews.length > 0 ? (
            <ul className="space-y-3">
              {allInterviews.map((interview) => (
                <li
                  key={interview.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">Type: {interview.type}</p>
                    <p className="font-medium">
                      Duration: {interview.durationMinutes}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Scheduled Date: {interview.scheduledDate.toISOString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Interview Type: {interview.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Location Type: {interview.interviewLocationType}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Interviewee ID: {interview.intervieweeId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Job Application ID: {interview.jobApplicationId}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No interviews found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deleted Interviews */}
      <Card>
        <CardHeader>
          <CardTitle>Deleted Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          {deletedInterviews && deletedInterviews.length > 0 ? (
            <ul className="space-y-3">
              {deletedInterviews.map((interview) => (
                <li key={interview.id} className="border p-3 rounded">
                  <p className="font-medium">ID: {interview.id}</p>
                  <p className="text-xs text-muted-foreground">Deleted</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No deleted interviews.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single Interview by ID */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Details (by ID)</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchId(inputId.trim());
            }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter interview ID"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {searchId ? (
              loadingSingle ? (
                <div>Loading…</div>
              ) : errorSingle ? (
                <div className="text-red-500">Failed to load interview.</div>
              ) : !singleInterview ? (
                <div className="text-muted-foreground text-center py-4">
                  No interview found with that ID.
                </div>
              ) : (
                <div className="border p-4 rounded">
                  <p className="font-medium">ID: {singleInterview.id}</p>
                  <p className="font-medium">Type: {singleInterview.type}</p>
                </div>
              )
            ) : null}
          </form>
        </CardContent>
      </Card>

      {/* Search Interviews by Type */}
      <Card>
        <CardHeader>
          <CardTitle>Search Interviews by Type</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchTitle(inputTitle.trim());
            }}
            className="flex gap-2"
          >
          </form> */}
          <Select
            onValueChange={(val: InterviewType) => {
              setSearchTitle(val);
            }}
            defaultValue={searchTitle}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select interview type" />
            </SelectTrigger>

            <SelectContent onChange={(val) => console.log(val)}>
              {Object.values(InterviewType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {searchTitle ? (
            loadingFiltered ? (
              <div className="mt-4">Loading…</div>
            ) : errorFiltered ? (
              <div className="mt-4 text-red-500">
                Failed to load interviews.
              </div>
            ) : !interviewByType || interviewByType.length === 0 ? (
              <div className="mt-4 text-muted-foreground text-center">
                No interview found with that type.
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {interviewByType.map((interview) => (
                  <li key={interview.id} className="border p-3 rounded">
                    <p className="font-medium">Type: {interview.type}</p>
                    <p className="font-medium">ID: {interview.id}</p>
                  </li>
                ))}
              </ul>
            )
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
