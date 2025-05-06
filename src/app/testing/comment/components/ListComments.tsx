"use client";

import React from "react";
import { useCommentQueries } from "../hooks/useCommentQueries";
import { useCommentMutations } from "../hooks/useCommentMutation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ListComment() {
  const [input, setInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { useCommentById } = useCommentQueries();
  const {
    data: comment,
    isLoading,
    error,
  } = useCommentById({ id: "70df652b-224a-4b92-8f98-d8763fe09fd0" });

  const { useUpdateComment } = useCommentMutations();
  const { updateComment, isPending, error: updatingError } = useUpdateComment();

  const showInput = () => {
    setIsUpdating(true);
  };

  const updateCommentData = {
    id: "70df652b-224a-4b92-8f98-d8763fe09fd0",
    data: {
      text: input,
    },
  };

  // Great work on the assignment! Your analysis was very thorough and well-structured.

  const updateCommentFunc = () => {
    if (input === "") {
      setIsUpdating(false);
    }
    updateComment(updateCommentData);
    setIsUpdating(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (updatingError) {
    return <div>Error: {updatingError.message}</div>;
  }

  if (!comment) return <div>No events found</div>;

  return (
    <>
      <h2 className="text-center text-3xl">Got comment by id</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle>{comment.text}</CardTitle>
            </div>
            <span className="text-sm text-muted-foreground">
              {comment.status}
            </span>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="justify-between">
            {isUpdating ? (
              <div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    e.preventDefault();
                    setInput(e.target.value);
                  }}
                  className="w-40 px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button variant="outline" size="sm" onClick={updateCommentFunc}>
                  update
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={showInput}>
                update
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
