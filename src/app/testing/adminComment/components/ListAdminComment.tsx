"use client";

import React from "react";
import { useAdminCommentQueries } from "../hooks/useAdminCommentQueries";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export function ListAdminComment() {
  const { useAllAdminComments } = useAdminCommentQueries();
  const { data, isLoading, error }: any = useAllAdminComments();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="animate-spin w-6 h-6 mr-2" /> Loading admin comments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 py-8 text-center">Error: {error.message}</div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="py-8 text-center text-muted-foreground">No admin comments found.</div>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Visibility</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Resolved</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Comment ID</th>
              </tr>
            </thead>
            <tbody className="bg-black divide-y divide-gray-100">
              {data.map((comment: any) => (
                <tr key={comment.id}>
                  <td className="px-4 py-2 font-mono text-xs">{comment.id}</td>
                  <td className="px-4 py-2">
                    <Badge variant="outline">{comment.visibility?.replaceAll("_", " ")}</Badge>
                  </td>
                  <td className="px-4 py-2">{comment.category?.replaceAll("_", " ")}</td>
                  <td className="px-4 py-2">{comment.priority?.charAt(0) + comment.priority?.slice(1).toLowerCase()}</td>
                  <td className="px-4 py-2">
                    {comment.resolved ? (
                      <Badge variant="default">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">{comment.commentId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
