"use client";

import { useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useUserSkillsQueries } from "../hooks/useUserSkillsQueries";

const defaultQueryParams = {
  limit: 10,
  offset: 0,
};

export function ListUserSkills() {
  const [inputSkillId, setInputSkillId] = useState("");
  const [skillId, setSkillId] = useState("");

  const [inputSkillProfileId, setInputSkillProfileId] = useState("");
  const [skillProfileId, setSkillProfileId] = useState("");

  const { useAllUserSkills, useDeletedUserSkills, useUserSkillById } =
    useUserSkillsQueries();

  const {
    data: userSkills,
    isLoading: loadingUserSkills,
    isError: errorUserSkills,
  } = useAllUserSkills(defaultQueryParams);

  const {
    data: deletedUserSkills,
    isLoading: loadingDeletedSkills,
    isError: errorDeletedSkills,
  } = useDeletedUserSkills(defaultQueryParams);

  const {
    data: singleUserSkill,
    isLoading: loadingSingleSkill,
    isError: errorSingleSkill,
  } = useUserSkillById({ id: skillId });

  if (errorUserSkills || errorDeletedSkills || errorSingleSkill) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load one or more user skill lists. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* All User Skills */}
      <Card>
        <CardHeader>
          <CardTitle>All User Skills</CardTitle>
        </CardHeader>
        <CardContent>
          {userSkills && userSkills.length > 0 ? (
            <ul className="space-y-3">
              {userSkills.map((userSkill: any) => (
                <li
                  key={userSkill.id}
                  className="flex justify-between border p-3 rounded"
                >
                  <div>
                    <p className="font-medium">Skill ID: {userSkill.id}</p>
                    <p className="text-xs text-muted-foreground">
                      Tag ID: {userSkill.tagId || "N/A"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Rating: {userSkill.selfRating}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Notes: {userSkill.notes || "N/A"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No user skills found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deleted User Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Deleted User Skills</CardTitle>
        </CardHeader>
        <CardContent>
          {deletedUserSkills && deletedUserSkills.length > 0 ? (
            <ul className="space-y-3">
              {deletedUserSkills.map((userSkill: any) => (
                <li key={userSkill.id} className="border p-3 rounded">
                  <p className="font-medium">Skill ID: {userSkill.id}</p>
                  <p className="text-xs text-muted-foreground">Deleted</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-center py-6">
              No deleted user skills.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single User Skill by ID */}
      <Card>
        <CardHeader>
          <CardTitle>User Skill Details (by ID)</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSkillId(inputSkillId.trim());
            }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Input
                placeholder="Enter user skill ID"
                value={inputSkillId}
                onChange={(e) => setInputSkillId(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>

            {skillId ? (
              loadingSingleSkill ? (
                <div>Loading…</div>
              ) : errorSingleSkill ? (
                <div className="text-red-500">Failed to load user skill.</div>
              ) : !singleUserSkill ? (
                <div className="text-muted-foreground text-center py-4">
                  No skill found with that ID.
                </div>
              ) : (
                <div className="border p-4 rounded">
                  <p className="font-medium">Skill ID: {singleUserSkill.id}</p>
                  <p className="text-xs text-muted-foreground">
                    Tag ID: {singleUserSkill.tagId || "N/A"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Rating: {singleUserSkill.selfRating}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Notes: {singleUserSkill.notes || "N/A"}
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
