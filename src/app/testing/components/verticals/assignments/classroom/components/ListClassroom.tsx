"use client";

import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useClassQueries } from "../hooks/useClassroomQueries";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export default function ListClassrooms() {
  const [inputId, setInputId] = useState("");
  const [searchId, setSearchId] = useState("");

  const [inputTitle, setInputTitle] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const {
    useAllClasses,
    useAllDeletedClasses,
    useClassById,
    useClassesByData,
  } = useClassQueries();

  const {
    data: allClasses,
    isLoading: loadingAll,
    isError: errorAll,
  } = useAllClasses(defaultQueryParams);

  const {
    data: deletedClasses,
    isLoading: loadingDeleted,
    isError: errorDeleted,
  } = useAllDeletedClasses(defaultQueryParams);

  const {
    data: singleClass,
    isLoading: loadingSingle,
    isError: errorSingle,
  } = useClassById({ id: searchId });

  const {
    data: classesByTitle,
    isLoading: loadingFiltered,
    isError: errorFiltered,
  } = useClassesByData({ title: searchTitle });

  if (errorAll || errorDeleted || errorSingle || errorFiltered) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load one or more classroom lists. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* All Classrooms */}
      <Card>
        <CardHeader>
          <CardTitle>All Classrooms</CardTitle>
        </CardHeader>
        <CardContent>
          {allClasses && allClasses.length > 0 ? (
            <ul className="space-y-3">
              {allClasses.map((cls: any) => (
                <li
                  key={cls.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">Title: {cls.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Status: {cls.status}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Year: {cls.year}, Quarter: {cls.quarter}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No classrooms found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deleted Classrooms */}
      <Card>
        <CardHeader>
          <CardTitle>Deleted Classrooms</CardTitle>
        </CardHeader>
        <CardContent>
          {deletedClasses && deletedClasses.length > 0 ? (
            <ul className="space-y-3">
              {deletedClasses.map((cls: any) => (
                <li key={cls.id} className="border p-3 rounded">
                  <p className="font-medium">Title: {cls.title}</p>
                  <p className="text-xs text-muted-foreground">Deleted</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No deleted classrooms.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single Classroom by ID */}
      <Card>
        <CardHeader>
          <CardTitle>Classroom Details (by ID)</CardTitle>
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
                placeholder="Enter classroom ID"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {searchId ? (
              loadingSingle ? (
                <div>Loading…</div>
              ) : errorSingle ? (
                <div className="text-red-500">Failed to load classroom.</div>
              ) : !singleClass ? (
                <div className="text-muted-foreground text-center py-4">
                  No classroom found with that ID.
                </div>
              ) : (
                <div className="border p-4 rounded">
                  <p className="font-medium">Title: {singleClass.title}</p>
                  <p className="text-xs text-muted-foreground">
                    Year: {singleClass.year}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Status: {singleClass.status}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Location: {singleClass.location}
                  </p>
                </div>
              )
            ) : null}
          </form>
        </CardContent>
      </Card>

      {/* Search Class by Title */}
      <Card>
        <CardHeader>
          <CardTitle>Search Classrooms by Title</CardTitle>
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
              placeholder="Enter class title"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>

          {searchTitle ? (
            loadingFiltered ? (
              <div className="mt-4">Loading…</div>
            ) : errorFiltered ? (
              <div className="mt-4 text-red-500">Failed to load classes.</div>
            ) : !classesByTitle || classesByTitle.length === 0 ? (
              <div className="mt-4 text-muted-foreground text-center">
                No classrooms found with that title.
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {classesByTitle.map((cls: any) => (
                  <li key={cls.id} className="border p-3 rounded">
                    <p className="font-medium">Title: {cls.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Year: {cls.year}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status: {cls.status}
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
