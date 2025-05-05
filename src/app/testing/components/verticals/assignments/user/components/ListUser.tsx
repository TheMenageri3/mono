"use client";

import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useUserQueries } from "../hooks/useUserQueries";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export function ListUsers() {
  const [inputEmail, setInputEmail] = useState("");
  const [email, setEmail] = useState("");

  const [inputWallet, setInputWallet] = useState("");
  const [wallet, setWallet] = useState("");

  const { useAllUsers, useDeletedUsers, useUserByEmail } = useUserQueries();

  const {
    data: users,
    isLoading: loadingUsers,
    isError: errorUsers,
  } = useAllUsers(defaultQueryParams);

  const {
    data: deletedUsers,
    isLoading: loadingDeleted,
    isError: errorDeleted,
  } = useDeletedUsers(defaultQueryParams);

  const {
    data: singleUser,
    isLoading: loadingSingle,
    isError: errorSingle,
  } = useUserByEmail({ email });

  if (errorUsers || errorDeleted || errorSingle) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load one or more user lists. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* All Users */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {users && users.length > 0 ? (
            <ul className="space-y-3">
              {users.map((user: any) => (
                <li
                  key={user.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">Email: {user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Name: {user.name || "N/A"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Role: {user.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status: {user.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No users found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deleted Users */}
      <Card>
        <CardHeader>
          <CardTitle>Deleted Users</CardTitle>
        </CardHeader>
        <CardContent>
          {deletedUsers && deletedUsers.length > 0 ? (
            <ul className="space-y-3">
              {deletedUsers.map((user: any) => (
                <li key={user.id} className="border p-3 rounded">
                  <p className="font-medium">Email: {user.email}</p>
                  <p className="text-xs text-muted-foreground">Deleted</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No deleted users.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single User by Email */}
      <Card>
        <CardHeader>
          <CardTitle>User Details (by Email)</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail(inputEmail.trim());
            }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter user email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {email ? (
              loadingSingle ? (
                <div>Loading…</div>
              ) : errorSingle ? (
                <div className="text-red-500">Failed to load user.</div>
              ) : !singleUser ? (
                <div className="text-muted-foreground text-center py-4">
                  No user found with that email.
                </div>
              ) : (
                <div className="border p-4 rounded">
                  <p className="font-medium">Email: {singleUser.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Name: {singleUser.name || "N/A"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Role: {singleUser.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Status: {singleUser.status}
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
