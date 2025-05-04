"use client";

import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRoleQueries } from "../hooks/useRoleQueries";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export function ListRoles() {
  const [inputCompanyId, setInputCompanyId] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [inputProfileId, setInputProfileId] = useState("");
  const [profileId, setProfileId] = useState("");

  const {
    useAllRoles,
    useDeletedRoles,
    useRolesByCompanyId,
    useRolesByProfileId,
  } = useRoleQueries();

  const {
    data: roles,
    isLoading: loadingRoles,
    isError: errorRoles,
  } = useAllRoles(defaultQueryParams);

  const {
    data: deletedRoles,
    isLoading: loadingDeleted,
    isError: errorDeleted,
  } = useDeletedRoles(defaultQueryParams);

  const {
    data: rolesByCompany,
    isLoading: loadingCompany,
    isError: errorCompany,
  } = useRolesByCompanyId({ ...defaultQueryParams, companyId });

  const {
    data: rolesByProfile,
    isLoading: loadingProfile,
    isError: errorProfile,
  } = useRolesByProfileId({ ...defaultQueryParams, profileId });

  if (errorRoles || errorDeleted || errorCompany || errorProfile) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load one or more role lists. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* All Roles */}
      <Card>
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
        </CardHeader>
        <CardContent>
          {roles && roles.length > 0 ? (
            <ul className="space-y-3">
              {roles.map((role: any) => (
                <li
                  key={role.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">Name: {role.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Category: {role.category}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Level: {role.level}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Internal: {role.isInternal ? "Yes" : "No"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No roles found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deleted Roles */}
      <Card>
        <CardHeader>
          <CardTitle>Deleted Roles</CardTitle>
        </CardHeader>
        <CardContent>
          {deletedRoles && deletedRoles.length > 0 ? (
            <ul className="space-y-3">
              {deletedRoles.map((role: any) => (
                <li key={role.id} className="border p-3 rounded">
                  <p className="font-medium">Name: {role.name}</p>
                  <p className="text-xs text-muted-foreground">Deleted</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No deleted roles.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Roles by Company ID */}
      <Card>
        <CardHeader>
          <CardTitle>Roles by Company ID</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCompanyId(inputCompanyId.trim());
            }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter company ID"
                value={inputCompanyId}
                onChange={(e) => setInputCompanyId(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {companyId ? (
              loadingCompany ? (
                <div>Loading…</div>
              ) : rolesByCompany && rolesByCompany.length > 0 ? (
                <ul className="space-y-3">
                  {rolesByCompany.map((role: any) => (
                    <li key={role.id} className="border p-3 rounded">
                      <p className="font-medium">Name: {role.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Department: {role.department}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted-foreground text-center py-4">
                  No roles found for this company ID.
                </div>
              )
            ) : null}
          </form>
        </CardContent>
      </Card>

      {/* Roles by Profile ID */}
      <Card>
        <CardHeader>
          <CardTitle>Roles by Profile ID</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setProfileId(inputProfileId.trim());
            }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter profile ID"
                value={inputProfileId}
                onChange={(e) => setInputProfileId(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {profileId ? (
              loadingProfile ? (
                <div>Loading…</div>
              ) : rolesByProfile && rolesByProfile.length > 0 ? (
                <ul className="space-y-3">
                  {rolesByProfile.map((role: any) => (
                    <li key={role.id} className="border p-3 rounded">
                      <p className="font-medium">Name: {role.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Category: {role.category}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-muted-foreground text-center py-4">
                  No roles found for this profile ID.
                </div>
              )
            ) : null}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
