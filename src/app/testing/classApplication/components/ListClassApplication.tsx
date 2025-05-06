"use client";

import React, { useState } from "react";
import { useClassApplicationQueries } from "../hooks/useClassApplicationQueries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export default function ListClassApplication() {
  const [inputId, setInputId] = useState("");
  const [searchId, setSearchId] = useState("");

  const [inputTitle, setInputTitle] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const {
    useAllClassApplications,
    useClassApplicationById,
    useClassApplicationsByFilter,
    useDeletedClassApplications,
  } = useClassApplicationQueries();
  const {
    data: allClassApplications,
    isLoading: loadingAll,
    error: errorAll,
  } = useAllClassApplications(defaultQueryParams);

  const {
    data: deletedClassApplications,
    isLoading: loadingDeleted,
    error: errorDeleted,
  } = useDeletedClassApplications(defaultQueryParams);

  const {
    data: singleClassApplication,
    isLoading: loadingSingle,
    error: errorSingle,
  } = useClassApplicationById({ id: searchId });

  const {
    data: classApplicationsByTitle,
    isLoading: loadingFiltered,
    error: errorFiltered,
  } = useClassApplicationsByFilter({ title: searchTitle });

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
  //   return <div>No class applications found</div>;

  return (
    <div className="space-y-6">
      {/* All Class Applications */}
      <Card>
        <CardHeader>
          <CardTitle>All Class Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {allClassApplications && allClassApplications.length > 0 ? (
            <ul className="space-y-3">
              {allClassApplications.map((classApplication) => (
                <li
                  key={classApplication.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">
                      Title: {classApplication.title}
                    </p>
                    <p className="font-medium">
                      Description: {classApplication.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status: {classApplication.status}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Start Date: {classApplication.startDatetime.toISOString()}
                      , End Date: {classApplication.endDatetime.toISOString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Class Application ID: {classApplication.id}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Class ID: {classApplication.classId}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No class applications found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deleted Class Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Deleted Class Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {deletedClassApplications && deletedClassApplications.length > 0 ? (
            <ul className="space-y-3">
              {deletedClassApplications.map((classApplication) => (
                <li key={classApplication.id} className="border p-3 rounded">
                  <p className="font-medium">Title: {classApplication.title}</p>
                  <p className="text-xs text-muted-foreground">Deleted</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No deleted class applications.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single Class Application by ID */}
      <Card>
        <CardHeader>
          <CardTitle>Class Application Details (by ID)</CardTitle>
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
                placeholder="Enter class application ID"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {searchId ? (
              loadingSingle ? (
                <div>Loading…</div>
              ) : errorSingle ? (
                <div className="text-red-500">
                  Failed to load class application.
                </div>
              ) : !singleClassApplication ? (
                <div className="text-muted-foreground text-center py-4">
                  No class application found with that ID.
                </div>
              ) : (
                <div className="border p-4 rounded">
                  <p className="font-medium">
                    Title: {singleClassApplication.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Status: {singleClassApplication.status}
                  </p>
                </div>
              )
            ) : null}
          </form>
        </CardContent>
      </Card>

      {/* Search Class Application by Title */}
      <Card>
        <CardHeader>
          <CardTitle>Search Class Application by Title</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchTitle(inputTitle.trim());
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Enter class application title"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>

          {searchTitle ? (
            loadingFiltered ? (
              <div className="mt-4">Loading…</div>
            ) : errorFiltered ? (
              <div className="mt-4 text-red-500">
                Failed to load class applications.
              </div>
            ) : !classApplicationsByTitle ||
              classApplicationsByTitle.length === 0 ? (
              <div className="mt-4 text-muted-foreground text-center">
                No class applications found with that title.
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {classApplicationsByTitle.map((classApplication) => (
                  <li key={classApplication.id} className="border p-3 rounded">
                    <p className="font-medium">
                      Title: {classApplication.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status: {classApplication.status}
                    </p>
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
