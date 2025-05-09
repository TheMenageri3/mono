"use client";

import React, { useState } from "react";
import { usePlacementsQueries } from "../hooks/usePlacementQueries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export default function ListPlacements() {
  const [inputId, setInputId] = useState("");
  const [searchId, setSearchId] = useState("");

  const [inputTitle, setInputTitle] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  const {
    useAllPlacements,
    usePlacementById,
    usePlacementsByFilter,
    useDeletedPlacements,
  } = usePlacementsQueries();
  const {
    data: allPlacements,
    isLoading: loadingAll,
    error: errorAll,
  } = useAllPlacements(defaultQueryParams);

  const {
    data: deletedPlacements,
    isLoading: loadingDeleted,
    error: errorDeleted,
  } = useDeletedPlacements(defaultQueryParams);

  const {
    data: singlePlacement,
    isLoading: loadingSingle,
    error: errorSingle,
  } = usePlacementById({ id: searchId });

  const {
    data: placementByJobTitle,
    isLoading: loadingFiltered,
    error: errorFiltered,
  } = usePlacementsByFilter({ jobTitle: searchTitle });

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
      {/* All Placements */}
      <Card>
        <CardHeader>
          <CardTitle>All Placements</CardTitle>
        </CardHeader>
        <CardContent>
          {allPlacements && allPlacements.length > 0 ? (
            <ul className="space-y-3">
              {allPlacements.map((placement) => (
                <li
                  key={placement.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">
                      Job Title: {placement.jobTitle}
                    </p>
                    <p className="font-medium">
                      Employment Type: {placement.employmentType}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Salary: {placement.salary}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Start Date: {placement.startDatetime.toISOString()}, End
                      Date:{" "}
                      {placement.endDatetime &&
                        placement.endDatetime.toISOString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Match Quality {placement.matchQuality}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Company ID {placement.companyId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Placement Facilitator ID{" "}
                      {placement.placementFacilitatorId}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Verified {placement.verified}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No placements found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deleted Placements */}
      <Card>
        <CardHeader>
          <CardTitle>Deleted Placement</CardTitle>
        </CardHeader>
        <CardContent>
          {deletedPlacements && deletedPlacements.length > 0 ? (
            <ul className="space-y-3">
              {deletedPlacements.map((placement) => (
                <li key={placement.id} className="border p-3 rounded">
                  <p className="font-medium">Job Title: {placement.jobTitle}</p>
                  <p className="text-xs text-muted-foreground">Deleted</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No deleted placement.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single Placement by ID */}
      <Card>
        <CardHeader>
          <CardTitle>Placement Details (by ID)</CardTitle>
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
                placeholder="Enter placement ID"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {searchId ? (
              loadingSingle ? (
                <div>Loading…</div>
              ) : errorSingle ? (
                <div className="text-red-500">Failed to load placement.</div>
              ) : !singlePlacement ? (
                <div className="text-muted-foreground text-center py-4">
                  No placement found with that ID.
                </div>
              ) : (
                <div className="border p-4 rounded">
                  <p className="font-medium">
                    Job Title: {singlePlacement.jobTitle}
                  </p>
                </div>
              )
            ) : null}
          </form>
        </CardContent>
      </Card>

      {/* Search Placements by Job Title */}
      <Card>
        <CardHeader>
          <CardTitle>Search Placement by Job Title</CardTitle>
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
              placeholder="Enter placement job title"
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
                Failed to load placements.
              </div>
            ) : !placementByJobTitle || placementByJobTitle.length === 0 ? (
              <div className="mt-4 text-muted-foreground text-center">
                No placements found with that job title.
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {placementByJobTitle.map((placement) => (
                  <li key={placement.id} className="border p-3 rounded">
                    <p className="font-medium">
                      Job Title: {placement.jobTitle}
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
