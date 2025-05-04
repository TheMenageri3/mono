"use client";

import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useProfileQueries } from "../hooks/useProfileQueries";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export function ListProfiles() {
  const [inputId, setInputId] = useState("");
  const [profileId, setProfileId] = useState("");

  const { useAllProfiles, useDeletedProfiles, useProfileById } =
    useProfileQueries();

  const {
    data: profiles,
    isLoading: loadingProfiles,
    isError: errorProfiles,
  } = useAllProfiles(defaultQueryParams);

  const {
    data: deletedProfiles,
    isLoading: loadingDeletedProfiles,
    isError: errorDeletedProfiles,
  } = useDeletedProfiles(defaultQueryParams);

  const {
    data: singleProfile,
    isLoading: loadingSingleProfile,
    isError: errorSingleProfile,
  } = useProfileById({ id: profileId });

  if (errorProfiles || errorDeletedProfiles || errorSingleProfile) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load one or more profile lists. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* All Profiles */}
      <Card>
        <CardHeader>
          <CardTitle>All Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          {profiles && profiles.length > 0 ? (
            <ul className="space-y-3">
              {profiles.map((profile: any) => (
                <li
                  key={profile.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">Email: {profile.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Name: {profile.firstName || "N/A"}{" "}
                      {profile.lastName || "N/A"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Job Title: {profile.jobTitle || "N/A"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Department: {profile.department || "N/A"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No profiles found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deleted Profiles */}
      <Card>
        <CardHeader>
          <CardTitle>Deleted Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          {deletedProfiles && deletedProfiles.length > 0 ? (
            <ul className="space-y-3">
              {deletedProfiles.map((profile: any) => (
                <li key={profile.id} className="border p-3 rounded">
                  <p className="font-medium">Email: {profile.email}</p>
                  <p className="text-xs text-muted-foreground">Deleted</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No deleted profiles.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single Profile by ID */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Details (by ID)</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setProfileId(inputId.trim());
            }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter profile ID"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {profileId ? (
              loadingSingleProfile ? (
                <div>Loading…</div>
              ) : errorSingleProfile ? (
                <div className="text-red-500">Failed to load profile.</div>
              ) : !singleProfile ? (
                <div className="text-muted-foreground text-center py-4">
                  No profile found with that ID.
                </div>
              ) : (
                <div className="border p-4 rounded">
                  <p className="font-medium">Email: {singleProfile.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Name: {singleProfile.firstName || "N/A"}{" "}
                    {singleProfile.lastName || "N/A"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Job Title: {singleProfile.jobTitle || "N/A"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Department: {singleProfile.department || "N/A"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Bio: {singleProfile.bio || "N/A"}
                  </p>
                </div>
              )
            ) : null}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
