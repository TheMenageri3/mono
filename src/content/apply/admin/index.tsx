/* eslint-disable @next/next/no-img-element */
"use client";
import toast from "react-hot-toast";
import { Button } from "~/_components/final/ui/button";
import { api } from "~/trpc/react";

export function ApplicationAdminPanel() {
  const exportApplications = api.exports.exportApplications.useMutation();

  const handleExportApplications = async () => {
    try {
      toast.success("Applications exported successfully!");
      await exportApplications.mutateAsync({
        courseId: "cm3yznp0h00005ue6tivs1c6z",
        outputPath:
          "/Users/jacksturtevant/work/menagerie/exports/applications.csv",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Admin</h1>
      <Button onClick={handleExportApplications}>Export Applications</Button>
    </div>
  );
}
